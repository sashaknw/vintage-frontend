// AuthProvider.jsx - Combines context with service
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import authService from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setError("Authentication failed");
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
      const response = await authService.register(userData);
      setUser(response.user);
      setError(null);
      return response;
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
      const response = await authService.login({ email, password });
      setUser(response.user);
      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);

      // Handle account deletion separately
      if (profileData.deleteAccount) {
        await authService.deleteAccount();
        logout();
        navigate("/");
        return { success: true };
      }

      const updatedProfile = await authService.updateProfile(profileData);
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedProfile,
      }));
      setError(null);
      return updatedProfile;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (formData) => {
    try {
      setLoading(true);
      const response = await authService.uploadProfilePicture(formData);

      // Update the user state with the new profile picture URL
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.profilePicture,
      }));

      setError(null);
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to upload profile picture"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get the public profile of any user
  const getPublicProfile = async (userId) => {
    try {
      return await authService.getPublicProfile(userId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user profile");
      throw err;
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
        uploadProfilePicture,
        getPublicProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
