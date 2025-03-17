"use client";

import { SessionProvider } from "next-auth/react";
import { AUTH_CONFIG } from "@/constants/config";
import { apiService } from "@/services/api";

// Store the auth token in memory
let authToken = null;
let currentUser = null;

/**
 * Auth Provider component for NextAuth
 */
export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

/**
 * Sign in a user with email and password
 */
export async function signIn(email, password) {
  try {
    const data = await apiService.login(email, password);
    
    // Save auth data
    authToken = data.token;
    currentUser = data.user;
    
    // Store in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_CONFIG.TOKEN_KEY, authToken);
      sessionStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(currentUser));
    }
    
    return data.user;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

/**
 * Register a new user
 */
export async function signUp(userData) {
  try {
    const data = await apiService.register(userData);
    return data.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    await apiService.logout();
    
    // Clear auth data
    authToken = null;
    currentUser = null;
    
    // Remove from sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      sessionStorage.removeItem(AUTH_CONFIG.USER_KEY);
    }
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  try {
    // Try to get user from memory first
    if (currentUser) {
      return currentUser;
    }
    
    // Check if we have a token in sessionStorage
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
      const storedUser = sessionStorage.getItem(AUTH_CONFIG.USER_KEY);
      
      if (storedToken && storedUser) {
        authToken = storedToken;
        currentUser = JSON.parse(storedUser);
        return currentUser;
      }
    }
    
    // Try to get user from API
    const data = await apiService.getCurrentUser();
    currentUser = data.user;
    return currentUser;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

/**
 * Check if the user is authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Get the authentication token
 */
export function getAuthToken() {
  if (authToken) {
    return authToken;
  }
  
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }
  
  return null;
}