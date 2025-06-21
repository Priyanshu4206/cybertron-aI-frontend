import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

// Components
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import OnboardingPortraitLayout from '../components/onboarding/OnboardingPortraitLayout';
import AccountTypeCard from '../components/onboarding/AccountTypeCard';
import PlanCard from '../components/onboarding/PlanCard';
import PlanTabs from '../components/onboarding/PlanTabs';
import Step3PlansLayout from '../components/onboarding/Step3PlansLayout';

// Context
import { useAuth } from '../context/AuthContext';

// Data
import { onboardingQuestions, accountTypes, planTabs, plansData } from '../utils/onboardingData';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fff;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 900px) {
    flex: none;
    padding: 2rem 0 0 0;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0 0 0;
  }
`;

const Logo = styled.img`
  width: 150px;
  
  @media (max-width: 480px) {
    width: 100px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: #fff;
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.2rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.3rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1.08rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  color: #222;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: black;
  font-size: 1.08rem;
  margin-top: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  outline: none;

  &::placeholder {
    color: gray;
  }

  &:focus {
    background: #f0f0f0;
  }
  
  @media (max-width: 480px) {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: black;
  font-size: 1.08rem;
  margin-top: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  appearance: none;
  outline: none;

  &::placeholder {
    color: gray;
  }

  &:focus {
    background: #f0f0f0;
  }
  
  @media (max-width: 480px) {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }
`;

const SelectIcon = styled(FaChevronDown)`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${props => props.primary ? '#111' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#111'};
  font-size: 1.15rem;
  font-weight: 600;
  border: ${props => props.primary ? 'none' : '1px solid #ccc'};
  border-radius: 10px;
  padding: 1rem 0;
  box-shadow: ${props => props.primary ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.15s;
  
  &:hover {
    background: ${props => props.primary ? '#232323' : '#f5f5f5'};
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.85rem 0;
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }
`;

const AccountCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    gap: 1.5rem;
  }
`;

const SkipLink = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
  
  &:hover {
    color: #000;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Onboarding = () => {
  const navigate = useNavigate();
  const { saveFormState } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    whatDoYouDo: '',
    describe: '',
    purpose: '',
    whoYouAre: '',
    accountType: '',
    planTab: 'individual',
    plan: '',
    billing: 'yearly',
  });

  // Step 1 Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 2 Handlers
  const handleAccountTypeSelect = (id) => {
    setForm((prev) => ({ ...prev, accountType: id, planTab: id, plan: '' }));
  };

  // Step 3 Handlers
  const handlePlanTab = (id) => {
    setForm((prev) => ({ ...prev, planTab: id, plan: '' }));
  };
  const handlePlanSelect = (id) => {
    setForm((prev) => ({ ...prev, plan: id }));
  };
  const handleBilling = (billing) => {
    setForm((prev) => ({ ...prev, billing }));
  };

  // Navigation
  const handleContinue = (e) => {
    e && e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else {
      // Save and finish onboarding
      saveFormState({ onboarding: form });
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSkip = (skipStep) => {
    // Skip only the current step and move to the next
    if (skipStep === 1) {
      // Skip step 1 (questions)
      setStep(2);
    } else if (skipStep === 2) {
      // Skip step 2 (account type) and move to step 3
      setForm(prev => ({ ...prev, accountType: 'individual' }));
      setStep(3);
    } else if (skipStep === 3) {
      // For step 3 (plan selection), set default values and finish
      setForm(prev => ({ ...prev, plan: 'basic' }));
      // Save and go to the next page
      saveFormState({ onboarding: form });
      navigate('/chat');
    }
  };

  return (
    <>
      {step === 1 && (
        <Wrapper>
          <Left>
            <FlexRow>
              <Logo src="/logo/logo-black-no-bg.png" alt="Cybertron.ai logo" />
              <Title>Cybertron.ai</Title>
            </FlexRow>
            <Tagline>All In One</Tagline>
          </Left>
          <Right>
            <Card style={{ maxWidth: 500, width: '100%' }}>
              <CardTitle>Just Answer Few Questions</CardTitle>
              <form onSubmit={handleContinue}>
                {onboardingQuestions.map((q) => (
                  <FormGroup key={q.name}>
                    <Label htmlFor={q.name}>{q.label}</Label>
                    {q.type === 'input' ? (
                      <Input
                        id={q.name}
                        name={q.name}
                        placeholder={q.placeholder}
                        value={form[q.name]}
                        onChange={handleChange}
                      />
                    ) : (
                      <SelectWrapper>
                        <Select
                          id={q.name}
                          name={q.name}
                          value={form[q.name]}
                          onChange={handleChange}
                          style={{ color: form[q.name] ? '#000' : 'gray' }}
                        >
                          {q.options.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt || q.placeholder}</option>
                          ))}
                        </Select>
                        <SelectIcon />
                      </SelectWrapper>
                    )}
                  </FormGroup>
                ))}
                <ButtonsContainer>
                  <ActionButton primary type="submit">Next</ActionButton>
                  <ActionButton onClick={() => handleSkip(1)}>Skip</ActionButton>
                </ButtonsContainer>
              </form>
            </Card>
          </Right>
        </Wrapper>
      )}
      {step === 2 && (
        <OnboardingPortraitLayout
          heading="Choose Account Type"
          subheading="( you can change it in settings )"
          actions={
            <ButtonsContainer>
              <Button variant="secondary" onClick={handleBack} style={{ width: '100%' }}>Back</Button>
              <Button onClick={handleContinue} disabled={!form.accountType} style={{ width: '100%' }}>Next</Button>
              <SkipLink onClick={() => handleSkip(2)}>Skip for now</SkipLink>
            </ButtonsContainer>
          }
        >
          <AccountCardGrid>
            {accountTypes.map((type) => (
              <AccountTypeCard
                key={type.id}
                title={type.title}
                features={type.features}
                selected={form.accountType === type.id}
                onClick={() => handleAccountTypeSelect(type.id)}
              />
            ))}
          </AccountCardGrid>
        </OnboardingPortraitLayout>
      )}
      {step === 3 && (
        <Step3PlansLayout
          planTab={form.planTab}
          onPlanTabChange={handlePlanTab}
          billing={form.billing}
          onBillingChange={handleBilling}
          plans={plansData[form.planTab]}
          selectedPlan={form.plan}
          onPlanSelect={handlePlanSelect}
          onContactSales={() => handlePlanSelect('enterprise')}
          onBack={handleBack}
          onContinue={handleContinue}
          disableContinue={!form.plan}
          onSkip={() => handleSkip(3)}
        />
      )}
    </>
  );
};

export default Onboarding; 