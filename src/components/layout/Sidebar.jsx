import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaMagic, FaChartBar, FaCreditCard, FaUserCircle, FaHome, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { MdOutlineTrendingUp } from 'react-icons/md';

// Context
import { useAuth } from '../../context/AuthContext';

const SidebarContainer = styled.div`
  width: 72px;
  padding-top: 64px;
  height: 100vh;
  background: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 1px 0 0 #e5e7eb;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const NavButton = styled(Link)`
  width: 58px;
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: ${({ active }) => (active ? '#000' : '#bdbdbd')};
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  font-size: 1.5rem;
  margin-bottom: 2px;
  transition: background 0.15s, color 0.15s;
  position: relative;
  
  span{
    font-size: 0.65rem;
    font-weight: 500;
    color: ${({ active }) => (active ? '#000' : '#bdbdbd')};
  }

  &:hover {
    background: ${({ active }) => (active ? '#fff' : '#232323')};
    color: ${({ active }) => (active ? '#000' : '#fff')};
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: #222;
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 999;

  ${NavButton}:hover & {
    opacity: 1;
  }
`;

const BottomSection = styled.div`
  margin-top: auto;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const navItems = [
  { path: '/chat', icon: <FaHome />, label: 'Home' },
  { path: '/automation', icon: <FaMagic />, label: 'Automation' },
  { path: '/billing', icon: <FaCreditCard />, label: 'Billing' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <SidebarContainer>
      <NavSection>
        {navItems.map((item) => (
          <NavButton
            key={item.path}
            to={item.path}
            active={location.pathname.startsWith(item.path) ? 1 : 0}
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
            <Tooltip>{item.label}</Tooltip>
          </NavButton>
        ))}
      </NavSection>
      <BottomSection>
        {isAuthenticated ? (
          <>
            <NavButton
              to="/account"
              active={location.pathname.startsWith('/account') ? 1 : 0}
              aria-label="Account"
            >
              <FaUserCircle />
              <Tooltip>{user?.name || 'Account'}</Tooltip>
            </NavButton>
            <NavButton
              as="button"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <FaSignOutAlt />
              <Tooltip>Logout</Tooltip>
            </NavButton>
          </>
        ) : (
          <NavButton
            to="/login"
            active={location.pathname.startsWith('/login') ? 1 : 0}
            aria-label="Login"
          >
            <FaSignInAlt />
            <Tooltip>Login</Tooltip>
          </NavButton>
        )}
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar; 