"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  isAuthenticated as checkAuth 
} from "@/lib/auth";

// Create an authentication context
const AuthContext = createContext();

/**
 * AuthProvider component to wrap the application with authentication context
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the user on initial mount
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Log in a user with email and password
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await signIn(email, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign in");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a new user
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await signUp(userData);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign up");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err.message || "Failed to sign out");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if the user is authenticated
   */
  const isAuthenticated = async () => {
    return await checkAuth();
  };

  // Provide the authentication context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

/**
 * HOC to protect routes that require authentication
 */
export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    return user ? <Component {...props} /> : null;
  };
}