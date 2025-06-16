import React from 'react';
import styled from 'styled-components';
import { mainTools, aiWorks } from '../../utils/dummyData';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.active ? '#fff' : '#ccc'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 18px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 8px 0;
`;

const CategoryLabel = styled.div`
  font-size: 12px;
  color: #999;
  padding: 0 12px;
`;

const NavigationList = ({ activeItem, onSelectItem }) => {
  return (
    <NavigationContainer>
      <CategoryLabel>AI Tools</CategoryLabel>

      {mainTools.map(item => (
        <NavigationItem 
          key={item.id}
          active={activeItem === item.id}
          onClick={() => onSelectItem(item.id, item.route)}
        >
          <IconWrapper>
            <item.icon />
          </IconWrapper>
          <Label>{item.name}</Label>
        </NavigationItem>
      ))}
      
      {/* <Divider />
      <CategoryLabel>AI Works</CategoryLabel> */}
      
        {/* {aiWorks.map(item => (
          <NavigationItem 
            key={item.id}
            active={activeItem === item.id}
            onClick={() => onSelectItem(item.id, item.route`)}
          >
            <IconWrapper>
              <item.icon />
            </IconWrapper>
            <Label>{item.name}</Label>
          </NavigationItem>
        ))} */}
    </NavigationContainer>
  );
};

export default NavigationList;