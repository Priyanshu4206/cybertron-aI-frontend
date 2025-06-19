import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../utils/apiService';
import firebaseService from '../utils/firebaseService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({});

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // First check local storage for token
        const token = localStorage.getItem('auth_token');

        if (token) {
          // If token exists, verify it's valid by getting user profile
          const response = await authService.getCurrentUser();

          if (response.success && response.data.me) {
            setUser(response.data.me);
            setIsAuthenticated(true);
          } else {
            // Token invalid or expired - try refreshing it if you have a refresh token
            // If no refresh mechanism, clear tokens
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // On error, clear tokens to be safe
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Helper to check if input is email
  const isEmail = (value) => /.+@.+\..+/.test(value);
  // Helper to check if input is phone (simple, adjust as needed)
  const isPhone = (value) => /^\d{10,15}$/.test(value.replace(/\D/g, ''));

  // Login function - using GraphQL API
  const login = async (credentials) => {
    try {
      setLoading(true);

      // Format credentials for API
      const loginInput = {};

      // Check if identifier is email or phone
      if (isEmail(credentials.identifier)) {
        loginInput.email = credentials.identifier;
      } else if (isPhone(credentials.identifier)) {
        loginInput.phoneNumber = credentials.identifier;
      } else {
        return { success: false, error: 'Please enter a valid email or phone number.' };
      }

      // If password is provided (normal login)
      if (credentials.password) {
        loginInput.password = credentials.password;

        // Call login API
        const response = await authService.login(loginInput);

        if (response.success) {
          // Store user data temporarily
          setUser(response.data.login.user);

          // If OTP is required, return success but don't set authenticated yet
          if (response.data.login.requiresOTP) {
            return { success: true, requiresOTP: true };
          }

          // If no OTP required (rare case), set authenticated
          setIsAuthenticated(true);
          return { success: true };
        }

        return {
          success: false,
          error: response.error || 'Login failed. Please check your credentials.'
        };
      }
      // If no password, we're just validating the identifier before OTP screen
      else {
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Google login with Firebase
  const loginWithGoogle = async () => {
    console.log("Login with Google Called!");
    try {
      setLoading(true);
      const firebaseResult = await firebaseService.signInWithGoogle();
      console.log("Result is: ", firebaseResult);

      if (!firebaseResult.success) {
        console.log("Error is: ", firebaseResult.error?.message || "Unknown error");
        return { success: false, error: firebaseResult.error?.message || 'Google login failed' };
      }

      const { user: firebaseUser, isNewUser } = firebaseResult;

      // If new user, redirect to onboarding
      if (isNewUser) {
        const userData = {
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName,
        };

        // Save user data for onboarding
        setUser(userData);
        console.log("New user is: ", userData);

        return { success: true, isNewUser: true };
      }
      // Existing user, get token from our backend
      else {
        try {
          // // For now, we'll use a mock token since the backend endpoint might not exist yet
          // // In a real implementation, you'd use the exchangeFirebaseToken service
          // console.log("Existing user, getting token for:", firebaseUser.email);

          // // Temporary solution: Store mock token until backend endpoint is ready
          // const mockToken = 'mock_jwt_token_' + Date.now();
          // localStorage.setItem('auth_token', mockToken);

          // In production, replace with:

          // Get the Firebase ID token
          const idToken = await firebaseUser.getIdToken();

          // Exchange Firebase token for your system's token
          const exchangeResponse = await authService.exchangeFirebaseToken(idToken);

          if (exchangeResponse.success && exchangeResponse.data.exchangeFirebaseToken?.token) {
            localStorage.setItem('auth_token', exchangeResponse.data.exchangeFirebaseToken.token);

            // Use the user data from the response if available
            const apiUserData = exchangeResponse.data.exchangeFirebaseToken.user;
            if (apiUserData) {
              setUser(apiUserData);
              localStorage.setItem('user_data', JSON.stringify(apiUserData));
              setIsAuthenticated(true);
              return { success: true };
            }
          } else {
            console.error("Failed to exchange token:", exchangeResponse.error);
            return { success: false, error: "Authentication failed" };
          }

          // // Use Firebase user data temporarily
          // const userData = {
          //   id: firebaseUser.uid,
          //   email: firebaseUser.email,
          //   displayName: firebaseUser.displayName,
          //   photoURL: firebaseUser.photoURL,
          // };

          // localStorage.setItem('user_data', JSON.stringify(userData));
          // setUser(userData);
          // setIsAuthenticated(true);
          // return { success: true };

        } catch (error) {
          console.error("Token exchange error:", error);
          return { success: false, error: "Failed to authenticate with the server" };
        }
      }
    } catch (error) {
      console.error('Google login failed:', error);
      return { success: false, error: 'Google login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Signup function - using GraphQL API
  const signup = async (userData) => {
    try {
      setLoading(true);

      // Format user data for API
      const registrationInput = {
        fullName: userData.name,
        password: userData.password,
      };

      // Check if identifier is email or phone
      if (isEmail(userData.email)) {
        registrationInput.email = userData.email;
      } else if (isPhone(userData.email)) {
        registrationInput.phoneNumber = userData.email;
      } else {
        return { success: false, error: 'Please enter a valid email or phone number.' };
      }

      // Call register API
      const response = await authService.register(registrationInput);

      if (response.success) {
        // Store user data
        setUser(response.data.register.user);

        // If OTP is required, return success but don't set authenticated yet
        if (response.data.register.requiresOTP) {
          return { success: true, requiresOTP: true };
        }

        // If no OTP required (rare case), set authenticated
        setIsAuthenticated(true);
        return { success: true };
      }

      return {
        success: false,
        error: response.error || 'Registration failed. Please try again.'
      };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP - using GraphQL API
  const verifyOTP = async (otpCode) => {
    try {
      setLoading(true);

      // Only proceed if we have user data (from login/signup)
      if (!user) {
        return { success: false, error: 'User session expired. Please login again.' };
      }

      // Create verification input
      const verificationInput = { otpCode };

      // Add email or phone number
      if (user.email) {
        verificationInput.email = user.email;
      } else if (user.phoneNumber) {
        verificationInput.phoneNumber = user.phoneNumber;
      } else {
        return { success: false, error: 'Invalid user data.' };
      }

      // Call verify OTP API
      const response = await authService.verifyOTP(verificationInput);

      if (response.success && response.data.verifyOTP.success) {
        // Store token and user data
        const { token, user: verifiedUser } = response.data.verifyOTP;

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(verifiedUser));

        setUser(verifiedUser);
        setIsAuthenticated(true);

        return { success: true };
      }

      return {
        success: false,
        error: response.error || response.data?.verifyOTP?.message || 'OTP verification failed.'
      };
    } catch (error) {
      return { success: false, error: 'OTP verification failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const resendOTP = async (identifier) => {
    try {
      setLoading(true);

      // Determine OTP method
      const method = isEmail(identifier) ? 'EMAIL' : 'SMS';

      // Call resend OTP API
      const response = await authService.resendOTP(identifier, method);

      if (response.success && response.data.resendOTP === true) {
        return { success: true };
      }

      return {
        success: false,
        error: response.error || 'Failed to resend OTP. Please try again.'
      };
    } catch (error) {
      return { success: false, error: 'Failed to resend OTP. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);

      // Call logout API if authenticated
      if (isAuthenticated) {
        await authService.logout();
      }

      // Check for Firebase user and sign out if needed
      const firebaseUser = await firebaseService.getCurrentUser();
      if (firebaseUser) {
        await firebaseService.signOut();
      }

      // Clear local storage and state
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setIsAuthenticated(false);
      setUser(null);

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage and state even on error
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  // Complete google registration with additional user data
  const completeGoogleRegistration = async (additionalData) => {
    try {
      setLoading(true);

      // Check if we have Firebase user data
      if (!user || !user.firebaseUid) {
        return { success: false, error: 'Missing user data.' };
      }

      // Create complete registration data
      const registrationData = {
        firebaseUid: user.firebaseUid,
        email: user.email,
        fullName: user.fullName,
        ...additionalData
      };

      // In a real app, call your API to store this additional data
      // For now, we'll mock a successful response

      // Mock response
      const mockToken = 'mock_jwt_token_' + Date.now();
      const completeUserData = {
        ...user,
        ...additionalData
      };

      // Save to local storage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(completeUserData));

      // Update state
      setUser(completeUserData);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to complete registration. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Save form state for persistent auth routing
  const saveFormState = (formData) => {
    setFormState(prevState => ({
      ...prevState,
      ...formData
    }));
  };

  // Clear specific form state
  const clearFormState = (formKey) => {
    setFormState(prevState => {
      const newState = { ...prevState };
      delete newState[formKey];
      return newState;
    });
  };

  // Value object to be provided to consumers
  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout,
    verifyOTP,
    resendOTP,
    completeGoogleRegistration,
    formState,
    saveFormState,
    clearFormState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 