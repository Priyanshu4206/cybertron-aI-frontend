import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  max-width: 250px;
  padding: ${({ size }) =>
    size === 'small' ? '0.5rem 1rem' :
    size === 'large' ? '1rem 1.5rem' :
    '0.75rem 1.25rem'};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: ${({ size }) =>
    size === 'small' ? '0.8rem' :
    size === 'large' ? '1rem' :
    '0.9rem'};
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ variant }) => variant === 'primary' && css`
    background: #000;
    color: white;
    
    &:hover:not(:disabled) {
      background: #333;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  `}

  ${({ variant }) => variant === 'secondary' && css`
    background: transparent;
    color: #000;
    border: 1px solid #000;
    
    &:hover:not(:disabled) {
      background: #f5f5f5;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .button-icon {
    display: flex;
    align-items: center;
    
    &.left {
      margin-right: 0.25rem;
    }
    
    &.right {
      margin-left: 0.25rem;
    }
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText = 'Loading...',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading-spinner"></span>
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon && <span className="button-icon left">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="button-icon right">{rightIcon}</span>}
        </>
      )}
    </StyledButton>
  );
};

export default Button; 