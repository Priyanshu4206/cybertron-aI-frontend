import React, { useRef, useState } from 'react';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

// Components
import Layout from '../components/layout/Layout';
import SubSidebar from '../components/layout/SubSidebar';
import ChatHistory from '../components/chat/ChatHistory';
import NavigationList from '../components/navigation/NavigationList';
import ChatInterface from '../components/chat/ChatInterface';
import AskBox from '../components/chat/AskBox';
import { mainTools } from '../utils/dummyData';

const HomeContainer = styled.div`
  display: ${({ isChatActive }) => isChatActive ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  min-height: ${({ isChatActive }) => isChatActive ? 'calc(100vh - 64px)' : 'auto'};
  padding: ${({ isChatActive }) => isChatActive ? '0' : '1.5rem'};
`;

const FlexRow = styled.div`
  display: ${({ isChatActive }) => isChatActive ? 'none' : 'flex'}; 
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
  transition: all 0.5s ease;
  opacity: ${({ isChatActive }) => isChatActive ? 0 : 1};
  height: ${({ isChatActive }) => isChatActive ? 0 : 'auto'};
`;

const Logo = styled.img`
  width: ${({ width }) => width ? width : "120px"};
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #000;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ToolGrid = styled.div`
  display: ${({ isChatActive }) => isChatActive ? 'none' : 'grid'};
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin: 2rem 0 1.5rem 0;
  width: 100%;
  max-width: 1024px;
  transition: all 0.5s ease;
  overflow: hidden;
  opacity: ${({ isChatActive }) => isChatActive ? 0 : 1};
  height: ${({ isChatActive }) => isChatActive ? 0 : 'auto'};
`;

const ToolCard = styled.div`
  background: #EDECF1ff;
  border-radius: 8px;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #000;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  cursor: pointer;
  min-width: 180px;
  transition: transform 0.15s;
  text-align: center;
  color: #333;

  &:hover {
    transform: translateY(-3px) scale(1.03);
  }
`;

const ToolIcon = styled.div`
  font-size: 2rem;
  color: #000;
`;

const ViewAllBtn = styled.button`
  display: ${({ isChatActive }) => isChatActive ? 'none' : 'block'};
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  width: 350px;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.5s ease;
  opacity: ${({ isChatActive }) => isChatActive ? 0 : 1};
  height: ${({ isChatActive }) => isChatActive ? 0 : 'auto'};
  
  &:hover {
    transform: translateY(-3px) scale(1.03);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
  }
`;

const ProductBy = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  transition: all 0.5s ease;
  display: ${({ isChatActive }) => isChatActive ? 'none' : 'block'};
  opacity: ${({ isChatActive }) => isChatActive ? 0 : 1};
  height: ${({ isChatActive }) => isChatActive ? 0 : 'auto'};
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;  
  height: 100%;
  opacity: ${({ isChatActive }) => isChatActive ? 1 : 0};
  transition: all 0.5s ease;
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: ${({ isChatActive }) => isChatActive ? 'flex' : 'none'};
  width: 100%;
  height: 100%;  
`;

const SidebarContainer = styled.div`
  height: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const AiChat = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { isChatActive, activateChat } = useUI();
    const chatInterfaceRef = useRef(null);
    const [activeNavItem, setActiveNavItem] = useState('text-to-image');    
    
    // Handle tool click with auth check
    const handleToolClick = (route) => {
        if (isAuthenticated) {
            if (route) {
                navigate(route);
            }
        } else {
            navigate('/login', { state: { from: { pathname: route || '/chat' } } });
        }
    };

    // View All handler with auth check
    const handleViewAll = () => {
        if (isAuthenticated) {
            navigate('/explore');
        } else {
            navigate('/login', { state: { from: { pathname: '/explore' } } });
        }
    };
    
    // Handle send message
    const handleSendMessage = (message) => {
        if (chatInterfaceRef.current) {
            chatInterfaceRef.current.handleSendMessage(message);
        }
    };
    
    // Handle new chat
    const handleNewChat = () => {
        if (chatInterfaceRef.current) {
            chatInterfaceRef.current.resetChat();
            // window.location.reload();
        }
    };

    // Navigation functions
    const handleNavItemClick = (itemId, route) => {
      setActiveNavItem(itemId);
      // Add navigation logic here
      if (isAuthenticated) {
        if (route) {
            navigate(route);
        }
    } else {
        navigate('/login', { state: { from: { pathname: route || '/chat' } } });
    }
    };

    return (
        <Layout title="Chat">
            <MainContainer isChatActive={isChatActive}>
                <SidebarContainer>
                    <SubSidebar
                        contextName="Chat with AI"
                        mainContent={<ChatHistory onNewChat={handleNewChat} />}
                        navigationContent={<NavigationList activeItem={activeNavItem} onSelectItem={handleNavItemClick} />}
                        showHistoryToggle={false}
                    />
                </SidebarContainer>
                
                <ContentArea>
                    <ChatContent isChatActive={isChatActive}>
                        <ChatInterface ref={chatInterfaceRef} />
                        <AskBox 
                            onSendMessage={handleSendMessage}
                            isFixed={isChatActive}
                        />
                    </ChatContent>
                </ContentArea>
            </MainContainer>
            <HomeContainer isChatActive={isChatActive}>
                <FlexRow isChatActive={isChatActive}>
                    <Logo src="/logo/logo-black-no-bg.png" alt="Cybertron.ai logo" />
                    <Title>Cybertron.ai</Title>
                </FlexRow>
                
                <AskBox 
                    onSendMessage={handleSendMessage}
                    isFixed={false}
                />
                
                <ToolGrid isChatActive={isChatActive}>
                    {mainTools.map((tool, idx) => (
                        <ToolCard
                            key={`${tool.name}-${idx}`}
                            color={tool.color}
                            onClick={() => handleToolClick(tool.route)}
                        >
                            <ToolIcon>{createElement(tool.icon)}</ToolIcon>
                            {tool.name}
                        </ToolCard>
                    ))}
                </ToolGrid>
                
                <ViewAllBtn 
                    onClick={handleViewAll}
                    isChatActive={isChatActive}
                >
                    {isAuthenticated ? 'View all' : 'Login to view all'}
                </ViewAllBtn>
                
                <ProductBy isChatActive={isChatActive}>
                    product by <strong>ZooQ inc.</strong>
                </ProductBy>
            </HomeContainer>
        </Layout>
    );
};

export default AiChat;