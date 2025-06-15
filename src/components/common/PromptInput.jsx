import React from 'react';
import styled from 'styled-components';

const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #111827;
`;

const PromptTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.9rem;
  color: #000;
  background: transparent;
  resize: none;

  &:focus {
    outline: none;
    border-color: #000;
  }

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.count > 2000 ? 'red' : '#666'};
`;

const PromptInput = ({ label, prompt, setPrompt, maxLength = 2000 }) => {
  return (
    <PromptContainer>
      <Label htmlFor={label}>{label}</Label>
      <PromptTextArea 
        placeholder="Paste Your Prompt Here..." 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        maxLength={maxLength}
        id={label}
        name={label}
      />
      <CharCount count={prompt.length}>
        {prompt.length}/{maxLength}
      </CharCount>
    </PromptContainer>
  );
};

export default PromptInput;