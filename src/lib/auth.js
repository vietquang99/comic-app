"use client";

// This is a simplified auth utility file. In a real application, 
// you would use a proper authentication solution like NextAuth.js, Clerk, or Auth0.

// Store the auth token in memory (not persistent across page refreshes in this example)
let authToken = null;
let currentUser = null;

// Simulated API endpoints
const API_URL = {
  login: "/api/auth/login",
  signup: "/api/auth/signup",
  logout: "/api/auth/logout",
  user: "/api/auth/user",
};

/**
 * Sign in a user with email and password
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<Object>} User data
 */
export async function signIn(email, password) {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(API_URL.login, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    
    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }
    
    // const data = await response.json();
    
    // Simulate a successful response
    const data = {
      token: "sample-jwt-token",
      user: {
        id: "user123",
        name: "John Doe",
        email: email,
      },
    };
    
    // Save auth data
    authToken = data.token;
    currentUser = data.user;
    
    // Store in sessionStorage for persistence across page refreshes
    // Note: In a real app, you'd use cookies or a more secure storage method
    if (typeof window !== "undefined") {
      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    
    return data.user;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

/**
 * Register a new user
 * @param {Object} userData User registration data
 * @returns {Promise<Object>} Created user data
 */
export async function signUp(userData) {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(API_URL.signup, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // });
    
    // if (!response.ok) {
    //   throw new Error("Registration failed");
    // }
    
    // const data = await response.json();
    
    // Simulate a successful response
    const data = {
      user: {
        id: "user123",
        name: userData.name,
        email: userData.email,
      },
    };
    
    return data.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export async function signOut() {
  try {
    // In a real app, this would be an actual API call
    // await fetch(API_URL.logout, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });
    
    // Clear auth data
    authToken = null;
    currentUser = null;
    
    // Remove from sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("currentUser");
    }
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

/**
 * Get the current authenticated user
 * @returns {Promise<Object|null>} User data or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    // Try to get user from memory first
    if (currentUser) {
      return currentUser;
    }
    
    // Check if we have a token in sessionStorage
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("authToken");
      const storedUser = sessionStorage.getItem("currentUser");
      
      if (storedToken && storedUser) {
        authToken = storedToken;
        currentUser = JSON.parse(storedUser);
        return currentUser;
      }
    }
    
    // In a real app, you might validate the token with the server
    // const response = await fetch(API_URL.user, {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });
    
    // if (!response.ok) {
    //   throw new Error("Failed to get user");
    // }
    
    // const data = await response.json();
    // currentUser = data.user;
    
    return null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

/**
 * Check if the user is authenticated
 * @returns {Promise<boolean>} True if authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Get the authentication token
 * @returns {string|null} Auth token
 */
export function getAuthToken() {
  if (authToken) {
    return authToken;
  }
  
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("authToken");
  }
  
  return null;
}