import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useUI } from '../../context/UIContext';

// Components
import ChatMessage from './ChatMessage';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 226px); /* Adjust for header and input area */
  background-color: #fff;
  opacity: ${({ isChatActive }) => isChatActive ? 1 : 0};
  transition: opacity 0.3s ease;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  scroll-behavior: smooth;
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

const ChatInterface = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isChatActive } = useUI();
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleSendMessage,
    resetChat: () => {
      setMessages([]);
      setIsTyping(false);
    }
  }));
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (messageData) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageData.text,
      attachments: messageData.attachments || [],
      isAI: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    
    // Mock API delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(messageData.text, messageData.mode),
        isAI: true,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };
  
  // Mock AI response based on mode
  const getAIResponse = (text, mode) => {
    if (mode === 'search') {
      return `I searched the web for information about "${text}" and found these results:\n\n1. According to recent studies, this topic has gained significant attention in the field.\n\n2. Experts suggest that understanding the points system is crucial for success in fantasy sports.\n\n3. The most effective strategy involves analyzing historical data and current trends.`;
    } else {
      return `Based on my knowledge, here are some thoughts about "${text}":\n\n- Fantasy sports typically use point systems that reward player performance in real-world games.\n- Different leagues may have different scoring rules, but they generally award points for achievements like goals, assists, or yards gained.\n- Understanding the specific point system for your fantasy league is essential for drafting players and making weekly lineup decisions.\n- Some systems are category-based while others use a points-based approach.`;
    }
  };
  
  return (
    <ChatContainer isChatActive={isChatActive}>
      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeContainer>
            <WelcomeTitle>Welcome to Cybertron.ai Chat</WelcomeTitle>
            <WelcomeText>
              Ask anything and get intelligent answers. You can search the web for real-time information
              or use the "Think" mode for AI-generated responses based on its knowledge.
            </WelcomeText>
          </WelcomeContainer>
        ) : (
          messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              attachments={message.attachments || []}
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
