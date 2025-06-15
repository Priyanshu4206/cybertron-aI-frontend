import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fff;
`;

const Left = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000;
`;

const ExploreBtn = styled.button`
  background: #000;
  color: white;
  padding: 0.75rem 2rem;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const OTPCard = styled.div`
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  padding: 2rem 2rem 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OTPLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
  width: 100%;
`;

const OTPInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const OTPInput = styled.input`
  width: 48px;
  height: 48px;
  border: 1.5px solid #111;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  background: #fff;
  color: #111;
  outline: none;
  box-shadow: none;
  transition: border 0.2s;
  &:focus {
    border-color: #635bff;
  }
  &:disabled {
    background: #f3f3f3;
    color: #aaa;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  margin-bottom: 1rem;
  min-height: 1.25rem;
`;

const ContinueButton = styled.button`
  width: 100%;
  background: #111;
  color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  margin-bottom: 0.75rem;
  cursor: pointer;
  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const Or = styled.div`
  text-align: center;
  color: #888;
  margin: 0.5rem 0 0.5rem 0;
  font-size: 0.95rem;
`;

const LoginBtn = styled.button`
  width: 100%;
  background: #635bff;
  color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const Legal = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: #666;
  margin: 0.5rem auto 0.25rem auto;
  max-width: 350px;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: #888;
  margin: 0.25rem auto 0 auto;
`;

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Get identifier (email or phone) and redirect path from location state
  const identifier = location.state?.identifier || '';
  const redirectTo = location.state?.redirectTo || '/chat';

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);
    setError('');
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (values = otpValues) => {
    const otpCode = values.join('');
    if (otpCode.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const result = await verifyOTP(otpCode);
      if (result.success) {
        navigate(redirectTo);
      } else {
        setError(result.error || 'Invalid OTP code. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Left>
        <Logo src="/logo/logo-black-no-bg.png" alt="Cybertron.ai logo" />
        <Title>Cybertron.ai</Title>
        <ExploreBtn onClick={() => navigate('/chat')}>Explore AI Studio</ExploreBtn>
      </Left>
      <Right>
        <OTPCard>
          <Heading>Verify OTP</Heading>
          <OTPLabel htmlFor="otp-input-0">OTP</OTPLabel>
          <OTPInputContainer>
            {otpValues.map((value, index) => (
              <OTPInput
                key={index}
                id={`otp-input-${index}`}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isSubmitting}
                autoComplete="off"
              />
            ))}
          </OTPInputContainer>
          <ErrorMessage>{error || ''}</ErrorMessage>
          <ContinueButton onClick={() => handleSubmit()} disabled={isSubmitting || otpValues.some(val => !val)}>
            Continue
          </ContinueButton>
          <Or>Or</Or>
          <LoginBtn onClick={() => navigate('/login')}>Login</LoginBtn>
          <Legal>
            Conditions Of Use And <Link to="/privacy">Privacy Notice</Link>.
          </Legal>
          <Copyright>© 2024-2025, ZooQinc.com, Inc. or its affiliates</Copyright>
        </OTPCard>
      </Right>
    </Wrapper>
  );
};

export default OTP; 