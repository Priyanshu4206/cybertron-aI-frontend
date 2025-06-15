import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub, FaKey } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';


const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fff;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #fff;
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 0.95rem;
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  color: black;

  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const FormContainer = styled.div`
  margin-top: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 1024px;
  width: 70%;

  h2{
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }

  form{
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    label{
      align-self: flex-start;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #111827;
  
  .required {
    color: #e53e3e;
    margin-left: 2px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 250px;
  background: #000;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 0.5rem;

  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const CreateLink = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background: #635bff;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
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
  max-width: 350px;
  width:100%;
`;

const LoginSchema = Yup.object().shape({
  identifier: Yup.string()
    .test('is-email-or-phone', 'Enter a valid email or phone number', value => {
      if (!value) return false;
      const emailRegex = /.+@.+\..+/;
      const phoneRegex = /^\d{10,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value.replace(/\D/g, ''));
    })
    .required('Mobile number or email is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState('');

  // Get the redirect path from state or default to '/chat'
  const from = location.state?.from?.pathname || '/chat';

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('');

    try {
      const result = await login({ identifier: values.identifier });

      if (result.success) {
        // Redirect to OTP verification
        navigate('/otp', { state: { identifier: values.identifier, redirectTo: from } });
      } else {
        setSubmitError(result.error || 'Failed to log in. Please try again.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`${provider} login clicked`);
  };

  return (
    <Container>
      <Left>
        <Logo src="/logo/logo-black-no-bg.png" alt="Cybertron.ai logo" />
        <Title>Cybertron.ai</Title>
        <ExploreBtn onClick={() => navigate('/chat')}>Explore AI Studio</ExploreBtn>
      </Left>
      <Right>
        <LoginBox>
          <Heading>Log in to your account</Heading>
          <SocialButton><FcGoogle /> Sign in with Google</SocialButton>
          <SocialButton><FaFacebook /> Sign in with Facebook</SocialButton>
          <SocialButton><FaGithub /> Sign in with GitHub</SocialButton>
          <SocialButton><FaKey /> Sign in with SSO</SocialButton>
        </LoginBox>

        <FormContainer>
          <h2>Login</h2>
          <Formik
            initialValues={{ identifier: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
              <Form>
                <FormGroup>
                  <Label htmlFor="identifier">Mobile Number or Email<span className="required">*</span></Label>
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="mobile no or email"
                    value={values.identifier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.identifier && errors.identifier}
                  />
                </FormGroup>
                <SubmitButton type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Continue'}</SubmitButton>
              </Form>
            )}
          </Formik>
          <Legal>
            By continuing, you agree to Cybertron.ai{' '}
            <Link to="/terms">Conditions of Use</Link> and{' '}
            <Link to="/privacy">Privacy Notice</Link>.
          </Legal>
          <CreateLink onClick={() => navigate('/signup')}>Create An Account</CreateLink>
        </FormContainer>
      </Right>
    </Container>
  );
};

export default Login;
