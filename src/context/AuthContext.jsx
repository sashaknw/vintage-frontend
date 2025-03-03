import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");

        if (token) {
          // Set auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token and get user data
          const response = await axios.get("http://localhost:5000/api/auth/me");

          setUser(response.data);
        }
      } catch (err) {
        // If token is invalid, clear it
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );

      // Store token
      localStorage.setItem("token", response.data.token);

      // Set auth header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Store token
      localStorage.setItem("token", response.data.token);

      // Set auth header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
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

    // Remove auth header
    delete axios.defaults.headers.common["Authorization"];

    // Clear user from state
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        userData
      );
      setUser(response.data);
      setError(null);
      return response.data;
    } catch (err) {
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
