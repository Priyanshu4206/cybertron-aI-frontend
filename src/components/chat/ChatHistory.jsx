import React from 'react';
import styled from 'styled-components';
import { MdAdd, MdOutlineChat } from 'react-icons/md';

const ChatHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;
  
  &:hover {
    border-color: #000;
    background-color: #fff;
    color: #000;
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex-grow: 1;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const ItemTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemDate = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 2px;
`;

// Mock chat history data
const mockChatHistory = [
  { id: 1, title: 'Fantasy football points system', date: 'Today' },
  { id: 2, title: 'Image generation for website', date: 'Yesterday' },
  { id: 3, title: 'Product description for new launch', date: '2 days ago' },
  { id: 4, title: 'Email campaign draft', date: '3 days ago' },
  { id: 5, title: 'Social media strategy', date: 'Last week' },
];

/**
 * ChatHistory component that shows chat history and new chat button
 */
const ChatHistory = ({ onNewChat, activeChatId }) => {
  return (
    <ChatHistoryContainer>
      <NewChatButton onClick={onNewChat} >
        <MdAdd size={20} />
        New Chat
      </NewChatButton>
      
      <HistoryList>
        {mockChatHistory.map((chat) => (
          <HistoryItem key={chat.id} active={chat.id === activeChatId}>
            <ItemIcon>
              <MdOutlineChat />
            </ItemIcon>
            <ItemInfo>
              <ItemTitle>{chat.title}</ItemTitle>
              <ItemDate>{chat.date}</ItemDate>
            </ItemInfo>
          </HistoryItem>
        ))}
      </HistoryList>
    </ChatHistoryContainer>
  );
};

export default ChatHistory;
