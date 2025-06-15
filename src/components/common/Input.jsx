import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ size }) => 
    size === 'small' ? '0.5rem 0.75rem' : 
    size === 'large' ? '0.75rem 1rem' : 
    '0.625rem 0.875rem'};
  font-size: ${({ size, theme }) => 
    size === 'small' ? theme.fontSizes.sm : 
    size === 'large' ? theme.fontSizes.lg : 
    theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.mediumGray};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.easeInOut};
  
  ${({ leftIcon }) => leftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${({ rightIcon }) => rightIcon && css`
    padding-right: 2.5rem;
  `}
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme, error }) => error ? theme.colors.error : theme.colors.primary}30;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkGray};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ErrorMessage = styled.div`
  display: ${({checks})=> checks ? 'block': 'none'};
  color: ${({ theme }) => theme.colors.error || '#e53e3e'};
  font-size: ${({ theme }) => theme.fontSizes.sm || '0.75rem'};
  margin-top: 0.25rem;
  min-height: 1.25rem;
`;

const HelperText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 0.25rem;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.darkGray};
  
  &.left-icon {
    left: 0.75rem;
  }
  
  &.right-icon {
    right: 0.75rem;
  }
`;

const Input = forwardRef(({
  label,
  error,
  checks = true,
  helperText,
  leftIcon,
  rightIcon,
  size = 'medium',
  ...props
}, ref) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      
      {leftIcon && (
        <IconContainer className="left-icon">
          {leftIcon}
        </IconContainer>
      )}
      
      <StyledInput
        ref={ref}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        error={error}
        {...props}
      />
      
      {rightIcon && (
        <IconContainer className="right-icon">
          {rightIcon}
        </IconContainer>
      )}
      
      <ErrorMessage checks = {checks}>{error || ''}</ErrorMessage>
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input; 