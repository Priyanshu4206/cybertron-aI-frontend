import React from 'react';
import styled from 'styled-components';
import { MdImage } from 'react-icons/md';
import Spinner from '../common/Spinner';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
`;

export const LoadingView = ({ message = "Generating your images... Please wait." }) => {
  return (
    <LoadingContainer>
      <Spinner size="lg" />
      <p>{message}</p>
    </LoadingContainer>
  );
};

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 16px;
`;

export const EmptyState = ({ 
  icon = <MdImage size={64} />, 
  message = "Enter a prompt and generate images to see results here" 
}) => {
  return (
    <EmptyStateContainer>
      {icon}
      <p>{message}</p>
    </EmptyStateContainer>
  );
};