import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [currentContextName, setCurrentContextName] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarView, setSidebarView] = useState('main'); // 'main', 'nav', 'history'

  // Check for mobile view on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Set default sidebar state based on screen size
      if (isMobile) {
        // Mobile: sidebar closed by default
        setIsSubSidebarOpen(false);
      } else {
        // Desktop: sidebar open by default
        setIsSubSidebarOpen(true);
      }
      
      console.log('Screen resize detected:', { 
        width: window.innerWidth, 
        isMobile, 
        isSubSidebarOpen: !isMobile 
      });
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubSidebar = () => {
    const newState = !isSubSidebarOpen;
    setIsSubSidebarOpen(newState);
    console.log('SubSidebar toggled:', { newState, isMobileView });
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

  const toggleSidebarView = (view) => {
    if (sidebarView === view) {
      setSidebarView('main');
    } else {
      setSidebarView(view);
    }

    // Ensure sidebar is open when toggling views
    if (!isSubSidebarOpen) {
      setIsSubSidebarOpen(true);
    }
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
    setContext,
    isMobileView,
    sidebarView,
    setSidebarView,
    toggleSidebarView
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  // Memoize showToast to avoid unnecessary re-renders
  const showToast = useCallback((message, options = {}) => {
    // options: { type: 'success' | 'error' | 'loading' | 'info', duration, icon, etc. }
    return hotToast(message, {
      position: 'top-center',
      duration: options.duration || (options.type === 'error' ? 5000 : 3000),
      icon: options.icon,
      ariaProps: { role: 'status', 'aria-live': 'polite' },
      style: {
        background: 'rgba(255,255,255,0.85)',
        color: '#222',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        fontSize: '1rem',
        fontWeight: 500,
        padding: '16px 24px',
        minWidth: '240px',
        maxWidth: '90vw',
      },
      ...options,
    });
  }, []);

  const dismissToast = useCallback((toastId) => {
    hotToast.dismiss(toastId);
  }, []);

  const contextValue = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.85)',
            color: '#222',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '16px 24px',
            minWidth: '240px',
            maxWidth: '90vw',
          },
          success: { icon: '✅' },
          error: { icon: '❌' },
          loading: { icon: '⏳' },
        }}
        containerStyle={{
          top: 24,
          left: 0,
          right: 0,
          margin: '0 auto',
          pointerEvents: 'none',
        }}
        gutter={12}
        reverseOrder={false}
      />
    </ToastContext.Provider>
  );
};

export default UIContext; 