import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://your-render-backend-url.onrender.com"
  : "http://localhost:5000";

  
// Create context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios for all requests
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add interceptor to handle auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");

        if (token) {
          // Verify token and get user data
          const response = await api.get("/api/auth/verify");
          setUser(response.data);
          console.log("User verified:", response.data);
        }
      } catch (err) {
        console.error("Auth verification error:", err);
        // If token is invalid, clear it
        localStorage.removeItem("token");
        setError(err.response?.data?.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      console.log("Registering user:", userData.email);

      const response = await api.post("/api/auth/signup", userData);
      console.log("Registration response:", response.data);

      // Store token
      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log("Login attempt for:", email);

      const response = await api.post("/api/auth/login", { email, password });
      console.log("Login response:", response.data);

      // Store token
      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from storage
    localStorage.removeItem("token");

    // Clear user from state
    setUser(null);
    console.log("User logged out");
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await api.put("/api/users/profile", userData);
      setUser(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err);
      setError(err.response?.data?.message || "Profile update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
