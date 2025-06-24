import axios from 'axios';

// API URL from environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GraphQL request helper
export const graphqlRequest = async (query, variables = {}, requiresAuth = false) => {
  try {
    const response = await api.post('', {
      query,
      variables,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0]?.message || 'GraphQL Error');
    }

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error.response?.data?.errors?.[0]?.message || error.message || 'Unknown error occurred',
    };
  }
};

// Auth related API calls
export const authService = {
  // Register with email/phone
  register: async (userData) => {
    const mutation = `
      mutation Register($input: UserRegistrationInput!) {
        register(input: $input) {
          user {
            firebaseUid
            email
            phoneNumber
            displayName
            planType
            availableTokens
            occupation
            occupationDescription
            accountPurposes
            accountType
            selectedPlan
            planDuration
            createdAt
          }
          requiresOTP
          token
        }
      }
    `;
    return graphqlRequest(mutation, { input: userData });
  },

  // Exchange Firebase ID token for system token
  exchangeFirebaseToken: async (firebaseToken) => {
    const mutation = `
      mutation ExchangeFirebaseToken($token: String!) {
        exchangeFirebaseToken(token: $token) {
          token
          user {
            firebaseUid
            email
            displayName
            phoneNumber
            planType
            availableTokens
          }
        }
      }
    `;
    return graphqlRequest(mutation, { token: firebaseToken });
  },

  // Login with email/phone and password
  login: async (credentials) => {
    const mutation = `
      mutation Login($input: UserLoginInput!) {
        login(input: $input) {
          user {
            firebaseUid
            email
            phoneNumber
            displayName
            planType
            availableTokens
            lastLoginAt
          }
          requiresOTP
        }
      }
    `;
    return graphqlRequest(mutation, { input: credentials });
  },

  // Verify OTP
  verifyOTP: async (verificationData) => {
    const mutation = `
      mutation VerifyOTP($input: OTPVerificationInput!) {
        verifyOTP(input: $input) {
          success
          message
          token
          user {
            firebaseUid
            email
            phoneNumber
            displayName
          }
        }
      }
    `;
    return graphqlRequest(mutation, { input: verificationData });
  },

  // Resend OTP
  resendOTP: async (identifier, method) => {
    const mutation = `
      mutation ResendOTP($email: String, $phoneNumber: String, $method: OTPMethod!) {
        resendOTP(email: $email, phoneNumber: $phoneNumber, method: $method)
      }
    `;
    
    // Determine if identifier is email or phone
    const isEmail = /.+@.+\..+/.test(identifier);
    const variables = {
      method: isEmail ? 'EMAIL' : 'SMS',
    };
    
    if (isEmail) {
      variables.email = identifier;
    } else {
      variables.phoneNumber = identifier;
    }
    
    return graphqlRequest(mutation, variables);
  },

  // Logout
  logout: async () => {
    const mutation = `
      mutation Logout {
        logout
      }
    `;
    return graphqlRequest(mutation, {}, true);
  },

  // Get current user
  getCurrentUser: async () => {
    const query = `
      query Me {
        me {
          firebaseUid
          email
          phoneNumber
          displayName
          planType
          availableTokens
          totalTokensConsumed
          occupation
          occupationDescription
          accountPurposes
          accountType
          selectedPlan
          planDuration
          lastLoginAt
          createdAt
        }
      }
    `;
    return graphqlRequest(query, {}, true);
  },

  // Update profile
  updateProfile: async (displayName) => {
    const mutation = `
      mutation UpdateProfile($displayName: String) {
        updateProfile(displayName: $displayName) {
          id
          displayName
          email
          phoneNumber
          updatedAt
        }
      }
    `;
    return graphqlRequest(mutation, { displayName }, true);
  },

  // Create initial user (for Google sign-up)
  createInitialUser: async (userData) => {
    const mutation = `
      mutation CreateInitialUser($input: InitialUserInput!) {
        createInitialUser(input: $input) {
          user {
            email
            firebaseUid
            displayName
          }
          token
          requiresOTP
          isProfileComplete
        }
      }
    `;
    return graphqlRequest(mutation, { input: userData });
  },

  // Complete profile (after onboarding)
  completeProfile: async (profileData) => {
    const mutation = `
      mutation CompleteProfile($input: ProfileCompletionInput!) {
        completeProfile(input: $input) {
          user {
            email
            firebaseUid
            displayName
            occupation
            occupationDescription
            accountPurposes
            accountType
            selectedPlan
            planDuration
          }
          isProfileComplete
        }
      }
    `;
    return graphqlRequest(mutation, { input: profileData });
  },

  // Request password reset
  requestPasswordReset: async (email, phoneNumber) => {
    const mutation = `
      mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
        requestPasswordReset(input: $input)
      }
    `;
    return graphqlRequest(mutation, { input: { email, phoneNumber } });
  },

  // Reset password
  resetPassword: async (email, phoneNumber, otpCode, newPassword) => {
    const mutation = `
      mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input)
      }
    `;
    return graphqlRequest(mutation, { input: { email, phoneNumber, otpCode, newPassword } });
  },
};

// Legacy text generation service - will be deprecated
export const textService = {
  // Generate text
  generateText: async (prompt, options = {}) => {
    const mutation = `
      mutation GenerateText($input: TextGenerationInput!) {
        generateText(input: $input) {
          text
          tokensConsumed
          historyId
        }
      }
    `;
    
    const input = {
      prompt,
      maxTokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7,
      options: options.additionalOptions || {},
    };
    
    return graphqlRequest(mutation, { input }, true);
  },
  
  // Get chat history - DEPRECATED, use chatService instead
  getChatHistory: async (options = {}) => {
    console.warn('getChatHistory is deprecated. Please use chatService.getConversations instead.');
    const query = `
      query MyHistory($serviceType: ServiceType, $limit: Int, $offset: Int, $startDate: String, $endDate: String) {
        myHistory(serviceType: $serviceType, limit: $limit, offset: $offset, startDate: $startDate, endDate: $endDate) {
          id
          serviceType
          input
          output
          tokensConsumed
          status
          createdAt
        }
      }
    `;
    
    const variables = {
      serviceType: 'text',
      limit: options.limit || 10,
      offset: options.offset || 0,
      startDate: options.startDate,
      endDate: options.endDate,
    };
    
    return graphqlRequest(query, variables, true);
  },
  
  // Get history by ID - DEPRECATED, use chatService instead
  getHistoryById: async (id) => {
    console.warn('getHistoryById is deprecated. Please use chatService.getConversationById instead.');
    const query = `
      query HistoryById($id: ID!) {
        historyById(id: $id) {
          id
          serviceType
          input
          output
          tokensConsumed
          status
          errorMessage
          metadata
          createdAt
        }
      }
    `;
    
    return graphqlRequest(query, { id }, true);
  },
};

export default api; 