import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  padding: 2rem;
`;

const Logo = styled.img`
  width: 64px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const Heading = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  padding-left: 3rem;
`;

const SubHeading = styled.div`
  font-size: 1.1rem;
  color: #444;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Actions = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
`;


const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
`;

const OnboardingPortraitLayout = ({
  logo = '/logo/logo-black-no-bg.png',
  heading,
  subheading,
  children,
  actions
}) => (
  <Wrapper>
    <FlexRow>
      <Logo src={logo} alt="Cybertron.ai logo" />
      <Title>Cybertron.ai</Title>
    </FlexRow>
    <FlexRow>
      <Heading>{heading}</Heading>
      {subheading && <SubHeading>{subheading}</SubHeading>}
    </FlexRow>
    <Content>{children}</Content>
    <Actions>{actions}</Actions>
  </Wrapper>
);

export default OnboardingPortraitLayout; 