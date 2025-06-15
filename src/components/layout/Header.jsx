import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineDown, AiOutlineSearch, AiOutlineGlobal } from 'react-icons/ai';

// Context
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: auto;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #111;
  font-size: .9rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  transition: background 0.15s;
  &:hover {
    background: #f3f3f3;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #111;
  font-size: .9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  transition: background 0.15s;
  &:hover {
    background: #f3f3f3;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.07);
  min-width: 160px;
  padding: 0.5rem 0;
  z-index: 1001;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1.2rem;
  color: #111;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }
`;

const LangSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-right: 1.2rem;
`;

const LangIcon = styled(AiOutlineGlobal)`
  font-size: 1.2rem;
  color: #888;
`;

const LangText = styled.span`
  font-size: 1rem;
  color: #111;
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const LoginLink = styled(Link)`
  color: #111;
  font-size: .9rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 1.1rem;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover {
    background: #f3f3f3;
  }
`;

const SignupBtn = styled(Link)`
  background: #111;
  color: #fff;
  font-size: .9rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 1.3rem;
  text-decoration: none;
  transition: background 0.15s;
  &:hover {
    background: #232323;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover {
    background: #f3f3f3;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #111;
`;

const LogoutButton = styled.button`
  background: #f3f3f3;
  color: #111;
  font-size: .9rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 1.1rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #e5e5e5;
  }
`;

const navLinks = [
  { label: 'AI', path: '/ai' },
  { label: 'Automation', path: '/automation' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'API', path: '/api' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

const productsDropdown = [
  { label: 'Studio', path: '/products/studio' },
  { label: 'Chatbot', path: '/products/chatbot' },
  { label: 'Image AI', path: '/products/image-ai' },
  { label: 'Audio AI', path: '/products/audio-ai' },
];

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoSection to="/chat">
        <LogoImg src="/logo/logo-black-no-bg.png" alt="Cybertron.ai logo" />
        <LogoText>Cybertron.ai</LogoText>
      </LogoSection>
      <NavLinks>
        <Dropdown
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <DropdownButton>
            Products <AiOutlineDown style={{ fontSize: '1rem' }} />
          </DropdownButton>
          {showDropdown && (
            <DropdownMenu>
              {productsDropdown.map((item) => (
                <DropdownItem key={item.path} onClick={() => navigate(item.path)}>
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
        {navLinks.map((item) => (
          <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
        ))}
      </NavLinks>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LangSection>
          <LangIcon />
          <LangText>EN</LangText>
        </LangSection>

        {isAuthenticated ? (
          <>
          </>
        ) : (
          <AuthSection>
            <LoginLink to="/login">Login</LoginLink>
            <SignupBtn to="/signup">Sign Up</SignupBtn>
          </AuthSection>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header; 