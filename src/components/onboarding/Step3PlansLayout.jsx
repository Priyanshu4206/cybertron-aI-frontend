import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { planTabs } from '../../utils/onboardingData';
import { FaCheckCircle } from 'react-icons/fa';

const Wrapper = styled.div`
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'space-between')};
  margin: ${({ margin }) => margin || '0'};
`;

const LogoTitle = styled(Row)`
  justify-content: flex-start;
  gap: 1.5rem;
`;

const Logo = styled.img`
  width: 56px;
  height: 56px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
`;

const TabsBillingRow = styled(Row)`
  justify-content: space-between;
`;

const PlanTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PlanTab = styled.button`
  background: ${({ selected }) => (selected ? '#635bff' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  border: 2px solid #635bff;
  font-weight: 600;
  font-size: 1.08rem;
  padding: 0.7rem 2.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  outline: none;
`;

const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  background: #eee;
  border-radius: 12px;
  overflow: hidden;
`;

const BillingBtn = styled.button`
  background: ${({ active }) => (active ? '#000' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 2.2rem;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  outline: none;
`;

const CardsRow = styled(Row)`
  justify-content: center;
  align-items: stretch;
  height: 100%;
  gap: 2rem;
`;

const CardWrapper = styled.div`
  min-width: 300px;
  max-width: 768px;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 18px;
  border: ${({ selected }) => (selected ? '2.5px solid #635bff' : '2px solid #e5e7eb')};
  box-shadow: ${({ selected }) => (selected ? '0 4px 16px rgba(99,91,255,0.08)' : '0 2px 8px rgba(0,0,0,0.04)')};
  background: #fff;
  padding: 0;
`;

const CardInner = styled.div`
  padding: 2rem 1.5rem 1.5rem 1.5rem;
`;

const BottomSection = styled.div`
  border-top: 1.5px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CardBottom = styled(BottomSection)`
  padding: 1.2rem 1.5rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.3rem;
`;

const OldPrice = styled.span`
  font-size: 1.1rem;
  color: #aaa;
  text-decoration: line-through;
  margin-left: 0.7rem;
`;

const RadioCircle = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #bbb;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ selected }) => selected && `
    border: 2.5px solid #635bff;
    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #635bff;
    }
  `}
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #111;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #333;

  svg {
    color: #635bff;
    margin-left: 0.6rem;
    font-size: 1.1rem;
  }
`;

const EnterpriseButton = styled(Button)`
  width: 100%;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 0 0 18px 18px;
  margin: 0;
  max-width: 100%;
  padding: 1.2rem 1.5rem;
`;

const ActionsRow = styled(Row)`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
`;

const Step3PlansLayout = ({
  logo = '/logo/logo-black-no-bg.png',
  title = 'Cybertron.ai',
  planTab,
  onPlanTabChange,
  billing,
  onBillingChange,
  plans,
  selectedPlan,
  onPlanSelect,
  onContactSales,
  onBack,
  onContinue,
  disableContinue
}) => (
  <Wrapper>
    <LogoTitle>
      <Logo src={logo} alt="Cybertron.ai logo" />
      <Title>{title}</Title>
    </LogoTitle>
    <TabsBillingRow>
      <PlanTabs>
        {planTabs.map(tab => (
          <PlanTab
            key={tab.id}
            selected={planTab === tab.id}
            onClick={() => onPlanTabChange(tab.id)}
          >
            {tab.label}
          </PlanTab>
        ))}
      </PlanTabs>
      <BillingToggle>
        <BillingBtn
          type="button"
          active={billing === 'monthly'}
          onClick={() => onBillingChange('monthly')}
        >
          Monthly
        </BillingBtn>
        <BillingBtn
          type="button"
          active={billing === 'yearly'}
          onClick={() => onBillingChange('yearly')}
        >
          Yearly
        </BillingBtn>
      </BillingToggle>
    </TabsBillingRow>
    <CardsRow>
      {plans.map((plan, idx) => (
        <CardWrapper
          key={plan.id}
          selected={selectedPlan === plan.id}
          onClick={() => onPlanSelect(plan.id)}
          style={{ cursor: 'pointer' }}
        >
          <CardInner>
            <CardTitle>{plan.title}</CardTitle>
            <RadioCircle selected={selectedPlan === plan.id} />
            <FeatureList>
              {plan.features.map((f, i) => (
                <FeatureItem key={i}>
                  {f} <FaCheckCircle /> 
                </FeatureItem>
              ))}
            </FeatureList>
          </CardInner>
          <BottomSection>
            {plan.id === 'enterprise' ? (
              <EnterpriseButton onClick={onContactSales}>
                Contact to sales
              </EnterpriseButton>
            ) : (
              <CardBottom>
                <div style={{ fontSize: '1rem', color: '#888', fontWeight: 500, width:"100px",textAlign:"center" }}>Only Just 70%Off</div>
                <Price>
                  ${plan.price.yearly}
                </Price>
                <Price>
                  {plan.price.old && <OldPrice>${plan.price.old}</OldPrice>}
                </Price>
              </CardBottom>
            )}
          </BottomSection>
        </CardWrapper>
      ))}
    </CardsRow>
    <ActionsRow>
      <Button variant="secondary" onClick={onBack} style={{ width: 180 }}>
        Back
      </Button>
      <Button onClick={onContinue} disabled={disableContinue} style={{ width: 180 }}>
        Continue
      </Button>
    </ActionsRow>
  </Wrapper>
);

export default Step3PlansLayout; 