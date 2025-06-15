import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import { FcGoogle } from 'react-icons/fc';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;

  @media (min-width: 768px) {
    border-right: 1px solid #eee;
  }

  h1 {
    font-size: 2rem;
    margin-top: 1rem;
    font-weight: 700;
  }
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
const SubHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);

  h2{
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .login {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 0.875rem;
    background-color: #3b82f6;
    padding: 0.75rem;
    border-radius: 6px;
    font-weight: 600;
    border: none;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #fff;
      text-decoration: none;

      &:visited{
        text-decoration: none;
        color: #fff;
      }
    }


    &:hover{
      transform: scale(1.01);
      transition: transform 0.2s ease-in-out;
    }
  }

  .terms {
    text-align: center;
    font-size: 0.75rem;
    margin-top: 0.75rem;

    a {
      color: #3b82f6;
      text-decoration: none;
    }
  }
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  width: fit-content;
  min-width: 300px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
  color: black;

  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
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
  margin: 0 auto;
  max-width: 250px;
  background: #000;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;

  &:hover{
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
  }
`;

const LoginBtn = styled.button`
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
  margin: auto;
  font-size: 0.75rem;
  color: #666;
  max-width: 350px;
  width:100%;
`;

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        navigate('/onboarding');
      } else {
        setSubmitError(result.error || 'Failed to sign up.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
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
        <SubHeading>Create an account</SubHeading>
        <SocialButton><FcGoogle /> Sign up with Google</SocialButton>
        <FormCard>
          <h2>Create an account</h2>

          {submitError && (
            <div style={{ color: '#e53e3e', marginBottom: '1rem', textAlign: 'center' }}>
              {submitError}
            </div>
          )}

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <FormGroup>
                  <Label htmlFor="name">Full Name<span className="required">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="First and Last Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Mobile Number or Email<span className="required">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Mobile number or email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Password<span className="required">*</span></Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="confirmPassword">Re-enter Password<span className="required">*</span></Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                </FormGroup>
                <SubmitButton type="submit" className="continue-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Continue'}
                </SubmitButton>
              </Form>
            )}
          </Formik>

          <Legal>
            By Continuing, You Agree To Cybertron.ai{' '}
            <Link to="/terms">Conditions Of Use</Link> And{' '}
            <Link to="/privacy">Privacy Notice</Link>.
          </Legal>

          <LoginBtn onClick={() => navigate('/login')}>Login</LoginBtn>
        </FormCard>
      </Right>
    </Wrapper>
  );
};

export default SignUp;
