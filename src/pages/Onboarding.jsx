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
`;

const Logo = styled.img`
  width: 150px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #000;
`;

const Tagline = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  margin-top: 1.5rem;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: #fff;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.3rem;
`;

const Label = styled.label`
  font-size: 1.08rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  color: #222;
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
`;

const SelectIcon = styled(FaChevronDown)`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

const ContinueBtn = styled.button`
  width: 100%;
  background: #111;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 1rem 0;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: background 0.15s;
  &:hover {
    background: #232323;
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const AccountCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
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
      // TODO: Save form data to context or API
      saveFormState({ onboarding: form });
      navigate('/chat');
    }
  };
  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
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
                <ContinueBtn type="submit">Continue</ContinueBtn>
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
            <>
              <Button variant="secondary" onClick={handleBack} style={{ width: '100%' }}>Back</Button>
              <Button onClick={handleContinue} disabled={!form.accountType} style={{ width: '100%' }}>Continue</Button>
            </>
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
        />
      )}
    </>
  );
};

export default Onboarding; 