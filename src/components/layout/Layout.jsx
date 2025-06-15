import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import Sidebar from './Sidebar';
import Header from './Header';

const SIDEBAR_WIDTH = '72px';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 64px;
  transition: all ${({ theme }) => theme.transitions.duration.normal} ${({ theme }) => theme.transitions.easing.easeInOut};
  margin-left: ${SIDEBAR_WIDTH};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndices.overlay};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const Layout = ({ children, title = 'Dashboard' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header title={title} onMenuClick={toggleSidebar} sidebarWidth={SIDEBAR_WIDTH} />
      
      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <MainContent>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 