import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({});

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

    // Helper to check if input is email
  const isEmail = (value) => /.+@.+\..+/.test(value);
  // Helper to check if input is phone (simple, adjust as needed)
  const isPhone = (value) => /^\d{10,15}$/.test(value.replace(/\D/g, ''));

  // Login function - OTP-based
  const login = async ({ identifier }) => {
    try {
      setLoading(true);
      // Validate identifier
      if (!isEmail(identifier) && !isPhone(identifier)) {
        return { success: false, error: 'Please enter a valid email or phone number.' };
      }
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Store identifier in user state for OTP verification
      const mockUser = isEmail(identifier)
        ? { id: '123456', name: identifier.split('@')[0], email: identifier, role: 'user' }
        : { id: '123456', name: identifier, phone: identifier, role: 'user' };
      setUser(mockUser);
      setIsAuthenticated(false); // Not authenticated until OTP is verified
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Signup function - simulated for MVP
  const signup = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockUser = {
        id: '123456',
        name: userData.name,
        email: userData.email,
        role: 'user',
      };
      
      // Save user data for onboarding
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP - simulated for MVP
  const verifyOTP = async (otp) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = 'mock_jwt_token_' + Date.now();
      if (user) {
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_data', JSON.stringify(user));
        setIsAuthenticated(true);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'OTP verification failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setIsAuthenticated(false);
    setUser(null);
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
    signup,
    logout,
    verifyOTP,
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