import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { MdCreateNewFolder, MdHearing, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiGlobe } from 'react-icons/bi';
import { CgAttachment } from 'react-icons/cg';
import { IoIosSend } from 'react-icons/io';
import { useUI } from '../../context/UIContext';

const AskBoxContainer = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;
  margin: 0 auto;

  ${({ isChatActive, isFixed }) => isChatActive && isFixed && `
    position: sticky;
    bottom: 0;
    z-index: 100;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    padding: 1rem 2rem;
    box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
    margin-top: 0;
    background-color: #fff;
  `}

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem 1rem;
  }
`;

const AskInputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const AskInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  outline: none;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
`;

const AskButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid #6666;
    width: 48px;
    height: 48px;
    color: #666;
    transition: all 0.2s;

    &:hover {
        background: #000;
        color: white;
    }
  }
`;

const AskActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.active ? '#000' : '#eee'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: none;
  border-radius: 25px;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Logo = styled.img`
  width: ${({ width }) => width ? width : "24px"};
`;

const AskBox = ({ onSendMessage, isFixed = false }) => {
  const { isChatActive, activateChat } = useUI();
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('search'); // 'search' or 'think'
  const inputRef = useRef(null);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Activate chat interface if not already active
    if (!isChatActive) {
      activateChat();
    }
    
    // Create message object
    const message = {
      text: inputValue,
      mode,
      attachments: []
    };
    
    // Pass message to parent
    if (onSendMessage) {
      onSendMessage(message);
    }
    
    // Clear input
    setInputValue('');
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <AskBoxContainer isChatActive={isChatActive} isFixed={isFixed}>
      <AskInputRow>
        <AskInput 
          placeholder="Ask Anything" 
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
        <AskButton onClick={handleSendMessage}>
          <span><IoIosSend size={32} /></span>
        </AskButton>
      </AskInputRow>
      <AskActions>
        <IconsWrapper>
          <CgAttachment size={28} color='#000' />
          <MdCreateNewFolder size={28} color='#000' />
        </IconsWrapper>
        <ActionButton 
          active={mode === 'search'} 
          onClick={() => handleModeChange('search')}
        >
          <BiGlobe size={24} /> Search
        </ActionButton>
        <ActionButton 
          active={mode === 'think'} 
          onClick={() => handleModeChange('think')}
        >
          <MdHearing size={24} /> Think
        </ActionButton>
        <ActionButton>
          <Logo src='/logo/logo-black-no-bg.png' width={"24px"} /> 
          GPT-04 <MdOutlineKeyboardArrowDown />
        </ActionButton>
      </AskActions>
    </AskBoxContainer>
  );
};

export default AskBox; 