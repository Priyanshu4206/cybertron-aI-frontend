import React from 'react';
import styled from 'styled-components';
import { MdContentCopy, MdEdit, MdThumbUp, MdThumbDown } from 'react-icons/md';

const MessageContainer = styled.div`
  display: flex;
  padding: 24px 0;
  border-bottom: 1px solid #eaeaea;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserMessageContainer = styled(MessageContainer)`
  background-color: #fff;
  flex-direction: row-reverse;
  justify-content: flex-start;
`;

const AIMessageContainer = styled(MessageContainer)`
  background-color: #f9f9f9;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ isAI }) => (isAI ? '#000' : '#6b57ff')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ isAI }) => (isAI ? '16px' : '0')};
  margin-left: ${({ isAI }) => (isAI ? '0' : '16px')};
  flex-shrink: 0;
  color: #fff;
  font-weight: 600;
`;

const MessageContent = styled.div`
  flex: 1;
  max-width: 70%;
  ${({ isUser }) => isUser && `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `}
`;

const MessageText = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  ${({ isUser }) => isUser && `
    background-color: #6b57ff;
    color: white;
    padding: 12px 16px;
    border-radius: 18px 18px 4px 18px;
    max-width: 100%;
    word-wrap: break-word;
  `}
  ${({ isAI }) => isAI && `
    background-color: transparent;
  `}
`;

const ThinkingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;

  span {
    width: 6px;
    height: 6px;
    background-color: #888;
    border-radius: 50%;
    margin-right: 4px;
    animation: thinking 1.4s infinite ease-in-out both;
  }

  span:nth-child(1) {
    animation-delay: -0.32s;
  }

  span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes thinking {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const MessageActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
  ${({ isUser }) => isUser && `
    justify-content: flex-end;
  `}
  
  ${MessageContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const FileAttachment = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 12px;
  gap: 8px;
  width: fit-content;
  ${({ isUser }) => isUser && `
    align-self: flex-end;
  `}
`;

const FileIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const ChatMessage = ({ 
  message, 
  isAI = false, 
  isThinking = false,
  attachments = []
}) => {
  const MessageWrapper = isAI ? AIMessageContainer : UserMessageContainer;
  const isUser = !isAI;
  
  return (
    <MessageWrapper>
      <Avatar isAI={isAI}>
        {isAI ? 'AI' : 'U'}
      </Avatar>
      
      <MessageContent isUser={isUser}>
        {isThinking ? (
          <ThinkingIndicator>
            <span></span>
            <span></span>
            <span></span>
          </ThinkingIndicator>
        ) : (
          <>
            <MessageText isUser={isUser} isAI={isAI}>{message}</MessageText>
            
            {attachments.length > 0 && attachments.map((file, index) => (
              <FileAttachment key={index} isUser={isUser}>
                <FileIcon>{file.icon || '📄'}</FileIcon>
                <FileName>{file.name}</FileName>
              </FileAttachment>
            ))}
            
            <MessageActions isUser={isUser}>
              {isAI && (
                <>
                  <ActionButton>
                    <MdContentCopy size={16} />
                    Copy
                  </ActionButton>
                  <ActionButton>
                    <MdEdit size={16} />
                    Edit
                  </ActionButton>
                  <ActionButton>
                    <MdThumbUp size={16} />
                    Like
                  </ActionButton>
                  <ActionButton>
                    <MdThumbDown size={16} />
                    Dislike
                  </ActionButton>
                </>
              )}
            </MessageActions>
          </>
        )}
      </MessageContent>
    </MessageWrapper>
  );
};

export default ChatMessage;