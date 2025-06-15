# Cybertron.AI - AI-Powered Creator Hub

A modern frontend for an AI-powered creator platform, built with React.js and styled-components.

## Project Overview

Cybertron.AI is a frontend MVP for an AI-powered creator platform that provides users with various AI tools for content creation, image generation, code assistance, and more. This version is a purely frontend simulation with dummy data, focusing on a seamless, interactive user journey.

## Features

- User authentication (signup, login, OTP verification)
- Onboarding flow
- Account type selection
- Subscription plan selection
- AI tools exploration
- Tool interfaces for text, image, code, and audio generation
- Persistent auth routing

## Tech Stack

- React.js
- Vite
- Styled Components
- React Router DOM
- Formik + Yup (form handling and validation)

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cybertron.ai.git
cd cybertron.ai
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── auth/         # Authentication components
│   ├── common/       # Reusable UI components
│   ├── layout/       # Layout components
│   ├── onboarding/   # Onboarding components
│   └── tools/        # AI tool components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── styles/          # Global styles and theme
└── utils/           # Utility functions and dummy data
```

## User Flow

1. User signs up or logs in
2. New users go through onboarding process
3. User selects account type
4. User chooses a subscription plan
5. User is directed to the explore page
6. User can browse and use various AI tools

## Development Notes

This is a frontend-only MVP with simulated functionality. All data is stored locally and API calls are mocked with timeouts to simulate network requests.

## License

[MIT](LICENSE)
