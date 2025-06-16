import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: #111827;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border: 1px solid #000;
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #000;
  color: white;
  border: none;
  
  &:hover {
    background-color: #333;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #000;
  border: 1px solid #000;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const CloneModelModal = ({ onClose, onProceed }) => {
  return (
      <ModalContainer>
        <ModalTitle>Do you want to clone your face model?</ModalTitle>
        <p>Creating your own face model will allow you to generate personalized thumbnails with your likeness.</p>
        
        <ButtonContainer>
          <PrimaryButton onClick={onProceed}>Yes, let's do it</PrimaryButton>
          <SecondaryButton onClick={onClose}>I'll do it later</SecondaryButton>
        </ButtonContainer>
      </ModalContainer>
  );
};

export default CloneModelModal; 