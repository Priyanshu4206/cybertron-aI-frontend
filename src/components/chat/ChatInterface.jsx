import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/UIContext';
import chatService from '../../utils/chatService';

// Components
import ChatMessage from './ChatMessage';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px); /* Adjust for header and input area */
  background-color: #fff;
  opacity: ${({ isChatActive }) => isChatActive ? 1 : 0};
  transition: opacity 0.3s ease;
  overflow: hidden;
  width: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-bottom: 4rem;
  width: 100%;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  line-height: 1.6;
`;

const ChatInterface = forwardRef(({ onRefreshHistory }, ref) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const { isChatActive } = useUI();
  const { isAuthenticated } = useAuth();
  const { showToast, dismissToast } = useToast();

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleSendMessage,
    resetChat: () => {
      setMessages([]);
      setIsTyping(false);
      setCurrentConversationId(null);
    },
    loadChatById: (conversationId) => {
      loadConversation(conversationId);
    },
    fetchConversations: () => {
      fetchConversations();
    }
  }));

  // Fetch conversations on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Load conversations from API
  const fetchConversations = async () => {
    if (!isAuthenticated) {
      console.log('ChatInterface: Not authenticated, skipping fetchConversations');
      return;
    }

    try {
      console.log('ChatInterface: Fetching conversations...');
      setIsLoadingConversation(true);
      const result = await chatService.getConversations();

      console.log('ChatInterface: API response:', result);

      if (result.success) {
        const conversations = result.data.conversations?.conversations || [];
        console.log('ChatInterface: Setting conversations:', conversations);
        setConversations(conversations);
      }
    } catch (error) {
      console.error('ChatInterface: Failed to fetch conversations:', error);
      showToast('Failed to load conversations', { type: 'error' });
    } finally {
      setIsLoadingConversation(false);
    }
  };

  // Load a specific conversation
  const loadConversation = async (conversationId) => {
    if (!conversationId || !isAuthenticated) return;

    try {
      setIsLoadingConversation(true);
      const result = await chatService.getConversationById(conversationId);

      if (result.success && result.data.conversation) {
        const conversation = result.data.conversation;

        // Format messages for display
        const formattedMessages = conversation.messages.map((msg, index) => ({
          id: `${conversationId}-${index}`,
          text: msg.content,
          isAI: msg.role === 'assistant',
          timestamp: new Date(msg.timestamp)
        }));

        // Set the current conversation
        setCurrentConversationId(conversationId);
        setMessages(formattedMessages);
      } else {
        showToast('Failed to load conversation. It may have been deleted or is unavailable.', { type: 'error' });
      }
          } catch (error) {
        showToast('Failed to load conversation. Please try again.', { type: 'error' });
        console.error('Failed to load conversation:', error);
      } finally {
      setIsLoadingConversation(false);
    }
  };

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      text: messageData.text,
      attachments: messageData.attachments || [],
      isAI: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      if (isAuthenticated) {
        let conversationId = currentConversationId;
        let response;
        // Always use sendMessage, let backend create conversation if needed
        const input = {
          conversationId: conversationId || undefined,
          message: messageData.text,
          settings: { temperature: 0.7, maxTokens: 1000 }
        };
        response = await chatService.sendMessage(input);
        if (response.success && response.data.sendMessage?.data) {
          const { conversationId: newConvId, message: aiMsg } = response.data.sendMessage.data;
          const wasNewConversation = !conversationId; // Check if this was a new conversation
          if (!conversationId) {
            conversationId = newConvId;
            setCurrentConversationId(conversationId);
          }
          const aiResponse = {
            id: aiMsg.id || Date.now() + 1,
            text: aiMsg.content,
            isAI: aiMsg.role === 'ASSISTANT' || aiMsg.role === 'assistant',
            timestamp: new Date(aiMsg.timestamp)
          };
          setIsTyping(false);
          setMessages(prev => [...prev, aiResponse]);
          // Set the typing message ID for animation
          setTypingMessageId(aiResponse.id);
          
          fetchConversations();
          // Only trigger chat history refresh if this was a NEW conversation
          if (wasNewConversation && onRefreshHistory) {
            console.log('ChatInterface: Calling onRefreshHistory - NEW conversation created');
            onRefreshHistory();
          } else {
            console.log('ChatInterface: Skipping onRefreshHistory - existing conversation');
          }
        } else {
          showToast(response.error || 'Failed to generate response. Please try again.', { type: 'error' });
          setIsTyping(false);
        }
      } else {
        setTimeout(() => {
          const mockResponse = getMockResponse(messageData.text, messageData.mode);
          const aiResponse = {
            id: Date.now() + 1,
            text: mockResponse,
            isAI: true,
            timestamp: new Date()
          };
          setIsTyping(false);
          setMessages(prev => [...prev, aiResponse]);
          // Set the typing message ID for animation
          setTypingMessageId(aiResponse.id);
        }, 2000);
      }
    } catch (error) {
      console.error('Message sending error:', error);
      showToast('Failed to send message. Please try again.', { type: 'error' });
      setIsTyping(false);
    }
  };

  // Handle typing animation completion
  const handleTypingComplete = (messageId) => {
    setTypingMessageId(null);
  };

  // Mock AI response for non-authenticated users
  const getMockResponse = (text, mode) => {
    if (mode === 'search') {
      return `I searched the web for information about "${text}" and found these results:\n\n1. According to recent studies, this topic has gained significant attention in the field.\n\n2. Experts suggest that understanding the points system is crucial for success in fantasy sports.\n\n3. The most effective strategy involves analyzing historical data and current trends.`;
    } else {
      return `Based on my knowledge, here are some thoughts about "${text}":\n\n- Fantasy sports typically use point systems that reward player performance in real-world games.\n- Different leagues may have different scoring rules, but they generally award points for achievements like goals, assists, or yards gained.\n- Understanding the specific point system for your fantasy league is essential for drafting players and making weekly lineup decisions.\n- Some systems are category-based while others use a points-based approach.`;
    }
  };

  return (
    <ChatContainer isChatActive={isChatActive}>
      <MessagesContainer className="scrollable-content">
        {messages.length === 0 ? (
          <WelcomeContainer>
            <WelcomeTitle>Welcome to Cybertron.ai Chat</WelcomeTitle>
            <WelcomeText>
              Ask anything and get intelligent answers. You can search the web for real-time information
              or get detailed explanations based on my knowledge.
            </WelcomeText>
          </WelcomeContainer>
        ) : (
          messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              attachments={message.attachments || []}
              isTyping={message.isAI && typingMessageId === message.id}
              onTypingComplete={() => handleTypingComplete(message.id)}
            />
          ))
        )}

        {isTyping && (
          <ChatMessage
            isAI={true}
            isThinking={true}
          />
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>
    </ChatContainer>
  );
});

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
