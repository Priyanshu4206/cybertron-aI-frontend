import React, { useState } from 'react';
import styled from 'styled-components';
import { MdMenu, MdChevronLeft, MdHistory } from 'react-icons/md';
import { useUI } from '../../context/UIContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SubSidebarContainer = styled.div`
  min-width: ${({ isOpen }) => (isOpen ? '280px' : '48px')};
  max-width: 450px;
  background: ${({currentView}) => currentView === 'nav' ? '#181818' : '#fff' };
  height: calc(100vh - 64px);
  overflow-y: hidden;
  transition: all 0.3s ease;
  box-shadow: ${({ isOpen }) => (isOpen ? '2px 0 5px rgba(0, 0, 0, 0.05)' : 'none')};
  display: flex;
  flex-direction: column;
`;

const SubSidebarHeader = styled.div`
  padding: ${({ isOpen }) => (isOpen ? '16px' : '16px 0')};
  border-bottom: 1px solid ${({currentView}) => currentView === 'nav' ? '#333': '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? 'space-between' : 'center')};
  height: 64px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  color: ${({currentView}) => currentView === 'nav' ? '#000' : '#fff' };
  padding: 0;
  border-radius: 4px;
`;
const HistoryButton = styled(ActionButton)`
  color: ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' };
`;

const HeaderTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' };
  color: ${({currentView}) => currentView === 'nav' ? '#000' : '#fff' };
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.3s ease;
  width: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({isOpen}) => (isOpen ? '0.5rem 1rem' : '0')};
  border: 1px solid ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' };
  border-radius: 25px;
  margin-right: ${({isOpen}) => (isOpen ? '8px' : '0')};
  flex: 1;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({currentView}) => currentView === 'nav' ? '#000' : '#fff' };
    color: ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' };

    ${ActionButton}{
      color: ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' }; 
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  width: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: opacity 0.3s ease;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({currentView}) => currentView === 'nav' ? '#fff' : '#000' };
  padding: 0;
  width: 48px;
  height: 48px;
  transition: all 0.2s;  

  &:hover {
    transform: scale(1.2); 
  }
`;

const ContentContainer = styled.div`
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.3s ease;
  padding: ${({ isOpen }) => (isOpen ? '16px' : '0')};
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 128px);
  width: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  flex: 1;
`;

/**
 * SubSidebar Component
 * @param {Object} props
 * @param {string} props.contextName - Name of the current context (e.g. "Chat with AI")
 * @param {React.ReactNode} props.mainContent - Component to show in main view
 * @param {React.ReactNode} props.navigationContent - Component to show in navigation view
 * @param {React.ReactNode} props.historyContent - Component to show in history view (optional)
 * @param {boolean} props.showHistoryToggle - Whether to show history toggle button (optional)
 */
const SubSidebar = ({ 
  contextName = "Context",
  mainContent,
  navigationContent,
  historyContent,
  showHistoryToggle = false
}) => {
  const { isSubSidebarOpen, toggleSubSidebar } = useUI();
  const [currentView, setCurrentView] = useState('main'); // 'main', 'nav', 'history'
  
  const handleViewToggle = () => {
    setCurrentView(currentView === 'main' ? 'nav' : 'main');
  };
  
  const handleHistoryToggle = () => {
    setCurrentView(currentView === 'history' ? 'main' : 'history');
  };
  
  const getHeaderTitle = () => {
    switch (currentView) {
      case 'nav':
        return "Navigate To";
      case 'history':
        return "History";
      default:
        return contextName;
    }
  };
  console.log(currentView);
  const renderContent = () => {
    switch (currentView) {
      case 'nav':
        return navigationContent;
      case 'history':
        return historyContent;
      default:
        return mainContent;
    }
  };

  return (
    <SubSidebarContainer isOpen={isSubSidebarOpen} currentView = {currentView}>
      <SubSidebarHeader isOpen={isSubSidebarOpen} currentView = {currentView}>
        <HeaderTitle isOpen={isSubSidebarOpen} onClick={handleViewToggle} currentView={currentView}>
          {getHeaderTitle()}
          <ActionButton currentView={currentView}>
              {currentView === 'nav' ? <FaChevronUp /> : <FaChevronDown />}
            </ActionButton>
        </HeaderTitle>
        
        {isSubSidebarOpen && (
          <HeaderActions isOpen={isSubSidebarOpen}>            
            {showHistoryToggle && (
              <HistoryButton onClick={handleHistoryToggle} currentView={currentView}>
                <MdHistory size={24}/> History
              </HistoryButton>
            )}
          </HeaderActions>
        )}
        
        <ToggleButton onClick={toggleSubSidebar} currentView={currentView}>
          {isSubSidebarOpen ? <MdChevronLeft /> : <MdMenu />}
        </ToggleButton>
      </SubSidebarHeader>
      
      <ContentContainer isOpen={isSubSidebarOpen}>
        {renderContent()}
      </ContentContainer>
    </SubSidebarContainer>
  );
};

export default SubSidebar; 