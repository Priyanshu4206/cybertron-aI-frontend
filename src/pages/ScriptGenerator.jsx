import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import SubSidebar from '../components/layout/SubSidebar';
import PromptForm from '../components/scriptGenerator/PromptForm';
import ScriptEditor from '../components/scriptGenerator/ScriptEditor';
import ScriptHistory from '../components/scriptGenerator/ScriptHistory';
import { sampleScriptContent, scriptHistory } from '../utils/scriptGeneratorData';
import { FaKeyboard } from 'react-icons/fa';
import NavigationList from '../components/navigation/NavigationList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f9f9f9;
  height: calc(100vh - 64px);
  position: relative;
`;

const EditorContainer = styled.div`
  height: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #666;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: #666;
  text-align: center;
  padding: 0 20px;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  max-width: 500px;
  margin: 0;
`;

const ShortcutTooltip = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  max-width: 300px;
`;

const KeyboardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
`;

const ScriptGenerator = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();  
  const [activeNavItem, setActiveNavItem] = useState('new-script');
  const [activeScriptId, setActiveScriptId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  // Handle navigation item selection
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
  
  // Handle script selection from history
  const handleScriptSelect = (scriptId) => {
    setActiveScriptId(scriptId);
    // Find the selected script
    const selectedScript = scriptHistory.find(script => script.id === scriptId);
    if (selectedScript) {
      setIsGenerating(true);
      setCurrentTitle(selectedScript.title);
      
      // Simulate API call to get full script content
      setTimeout(() => {
        setGeneratedScript(sampleScriptContent);
        setIsGenerating(false);
      }, 1000);
    }
  };
  
  // Handle script generation
  const handleGenerateScript = (formData) => {
    setCurrentTitle(formData.title);
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedScript(sampleScriptContent);
      setIsGenerating(false);
    }, 2000);
  };
  
  // Render main content based on navigation state
  const renderMainContent = () => {
    if (activeNavItem === 'new-script') {
      return <PromptForm onGenerate={handleGenerateScript} />;
    } else if (activeNavItem === 'my-scripts' || activeNavItem === 'templates') {
      return <ScriptHistory onSelectScript={handleScriptSelect} activeScriptId={activeScriptId} />;
    } else {
      // For script type selections, show the prompt form
      return <PromptForm onGenerate={handleGenerateScript} />;
    }
  };
  
  // Render content area based on state
  const renderContentArea = () => {
    if (isGenerating) {
      return (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Generating your script...</LoadingText>
        </LoadingContainer>
      );
    } else if (generatedScript) {
      return (
        <EditorContainer>
          <ScriptEditor initialContent={generatedScript} />
        </EditorContainer>
      );
    } else {
      return (
        <EmptyState>
          <EmptyStateIcon>📝</EmptyStateIcon>
          <EmptyStateTitle>No Script Selected</EmptyStateTitle>
          <EmptyStateText>
            Fill out the form in the sidebar to generate a new script, or select an existing script from your history.
          </EmptyStateText>
        </EmptyState>
      );
    }
  };
  
  return (
    <Layout title={currentTitle || "Script Generator"}>
      <MainContainer>
        <SubSidebar
          contextName="Script Generator"
          mainContent={renderMainContent()}
          navigationContent={<NavigationList activeItem={activeNavItem} onSelectItem={handleNavItemClick} />}
          showHistoryToggle={true}
          historyContent={<ScriptHistory onSelectScript={handleScriptSelect} activeScriptId={activeScriptId} />}
        />
        
        <ContentArea>
          {renderContentArea()}
        </ContentArea>
      </MainContainer>
    </Layout>
  );
};

export default ScriptGenerator; 