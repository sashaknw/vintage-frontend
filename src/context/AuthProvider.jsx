// AuthProvider.jsx
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

          // Debug logs
          console.log("User data from verification:", userData);

          // Store full user data in state
          setUser(userData);

          // Optional: keep a backup of user data in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData"); // Clear backup data
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

      // Store the complete user object
      setUser(response.user);

      // Optional: keep a backup of user data in localStorage
      localStorage.setItem("userData", JSON.stringify(response.user));

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

      // Store the complete user object
      setUser(response.user);

      // Optional: keep a backup of user data in localStorage
      localStorage.setItem("userData", JSON.stringify(response.user));

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
    localStorage.removeItem("userData"); // Clear backup data
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

      // Update the entire user object with the new data
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedProfile,
      }));

      // Update backup in localStorage
      if (updatedProfile) {
        const currentData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...currentData,
            ...updatedProfile,
          })
        );
      }

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

      // Update backup in localStorage
      if (response.profilePicture) {
        const currentData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...currentData,
            profilePicture: response.profilePicture,
          })
        );
      }

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
