import React from 'react';
import styled, { css } from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-width: 768px;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  ${({ selected }) =>
    selected &&
    css`
      border: 2.5px solid #635bff;
      box-shadow: 0 6px 20px rgba(99, 91, 255, 0.12);
    `}

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #111;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #333;

  svg {
    color: #635bff;
    margin-left: 0.6rem;
    font-size: 1.1rem;
  }
`;

const RadioCircle = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #bbb;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ selected }) =>
    selected &&
    css`
      border: 2.5px solid #635bff;
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #635bff;
      }
    `}
`;

const AccountTypeCard = ({ title, features, selected, onClick }) => (
  <Card selected={selected} onClick={onClick} tabIndex={0} role="button" aria-pressed={selected}>
    <Title>{title}</Title>
    <FeatureList>
      {features.map((f, i) => (
        <FeatureItem key={i}>
          {f} <FaCheckCircle />
        </FeatureItem>
      ))}
    </FeatureList>
    <RadioCircle selected={selected} />
  </Card>
);

export default AccountTypeCard;
