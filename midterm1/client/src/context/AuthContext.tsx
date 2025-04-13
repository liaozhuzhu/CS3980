'use client'
// auth-context.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// Define proper user interface
interface User {
  username: string;
  token: string;
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  checkUser: () => Promise<void>;
}

const AUTH_STATE_CHANGED = 'auth-state-changed';

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  checkUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Function to check if the user is logged in
  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Make a request to your /me endpoint to validate the token
        const res = await axios.get('http://localhost:8000/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Extract username from response and create user object
        const userData: User = {
          username: res.data.username,
          token: token
        };
        
        setUser(userData);
      } catch (err) {
        console.error('Token validation failed:', err);
        localStorage.removeItem('token'); // Remove invalid token
        setUser(null); // Invalid token
      }
    } else {
      setUser(null); // No token, not logged in
    }
  };

  // Effect to check user login status on component mount
  useEffect(() => {
    checkUser();

    // Listen for auth state change events
    const handleAuthChange = () => {
      checkUser();
    };

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkUser();
      }
    };

    // Add event listeners
    window.addEventListener(AUTH_STATE_CHANGED, handleAuthChange);
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGED, handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function
  const login = (token: string) => {
    localStorage.setItem('token', token); // Store token in localStorage
    
    try {
      // Decode token to get user information
      const decoded: any = jwtDecode(token);
      
      // Set user state with username from token
      setUser({
        username: decoded.sub,
        token: token
      });
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event(AUTH_STATE_CHANGED));
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Update the state to logged out
    
    router.push('/login');
    window.dispatchEvent(new Event(AUTH_STATE_CHANGED));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};