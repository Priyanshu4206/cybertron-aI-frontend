import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [currentContextName, setCurrentContextName] = useState('');
  
  const toggleSubSidebar = () => {
    setIsSubSidebarOpen(!isSubSidebarOpen);
  };
  
  const activateChat = () => {
    setIsChatActive(true);
    setCurrentContextName('Chat with AI');
  };
  
  const deactivateChat = () => {
    setIsChatActive(false);
    setCurrentContextName('');
  };
  
  const setContext = (contextName) => {
    setCurrentContextName(contextName);
  };
  
  const value = {
    isSubSidebarOpen,
    setIsSubSidebarOpen,
    toggleSubSidebar,
    isChatActive,
    setIsChatActive,
    activateChat,
    deactivateChat,
    currentContextName,
    setContext
  };
  
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContext; 