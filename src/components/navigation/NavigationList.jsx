import React from 'react';
import styled from 'styled-components';
import { createElement } from 'react';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  height: 100%;
`;

const NavItem = styled.div`
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

const ItemDescription = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 2px;
`;

const SectionTitle = styled.h4`
  font-size: 0.85rem;
  color: #777;
  margin: 16px 0 8px 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:first-child {
    margin-top: 0;
  }
`;

/**
 * NavigationList component that shows navigation options
 */
const NavigationList = ({ items = [], activeItemId, onItemSelect }) => {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Sort categories to ensure consistent order
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <ListContainer>
      {sortedCategories.map((category) => (
        <React.Fragment key={category}>
          <SectionTitle>{category}</SectionTitle>
          {groupedItems[category].map((item) => (
            <NavItem 
              key={item.id || item.route || `${item.label}`}
              active={item.id === activeItemId || item.route === activeItemId}
              onClick={() => onItemSelect && onItemSelect(item.route || item.id, item)}
            >
              <ItemIcon>
                {createElement(item.icon)}
              </ItemIcon>
              <ItemInfo>
                <ItemTitle>{item.label}</ItemTitle>
                {item.description && (
                  <ItemDescription>{item.description}</ItemDescription>
                )}
              </ItemInfo>
            </NavItem>
          ))}
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default NavigationList; 