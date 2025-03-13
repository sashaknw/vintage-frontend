import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import authService from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await authService.getCurrentUser();

          console.log("User data from verification:", userData);
          console.log("Is admin flag present?", userData.isAdmin !== undefined);
          console.log("Is admin value:", userData.isAdmin);

          const userWithAdmin = {
            ...userData,
            isAdmin: userData.isAdmin === true, 
          };

          console.log("Setting user with admin status:", userWithAdmin.isAdmin);

          setUser(userWithAdmin);

          localStorage.setItem("userData", JSON.stringify(userWithAdmin));
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData"); 
        setError("Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);

      const userWithAdmin = {
        ...response.user,
        isAdmin: response.user.isAdmin === true,
      };

      console.log("Setting user after register:", userWithAdmin);
      setUser(userWithAdmin);

      localStorage.setItem("userData", JSON.stringify(userWithAdmin));

      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });

      const userWithAdmin = {
        ...response.user,
        isAdmin: response.user.isAdmin === true,
      };

      console.log("Setting user after login:", userWithAdmin);
      console.log("Admin status:", userWithAdmin.isAdmin);

      setUser(userWithAdmin);

      localStorage.setItem("userData", JSON.stringify(userWithAdmin));

      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("userData"); 
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);

      if (profileData.deleteAccount) {
        await authService.deleteAccount();
        logout();
        navigate("/");
        return { success: true };
      }

      const updatedProfile = await authService.updateProfile(profileData);

      const updatedUser = {
        ...user,
        ...updatedProfile,
        isAdmin: user?.isAdmin || false,
      };

      setUser(updatedUser);

      if (updatedProfile) {
        const currentData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...currentData,
            ...updatedProfile,
            isAdmin: user?.isAdmin || false,
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

  const uploadProfilePicture = async (formData) => {
    try {
      setLoading(true);
      const response = await authService.uploadProfilePicture(formData);

      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.profilePicture,
      }));

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

  const getPublicProfile = async (userId) => {
    try {
      return await authService.getPublicProfile(userId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user profile");
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Current user state:", user);
      console.log("isAdmin state:", user.isAdmin);
    }
  }, [user]);

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
        isAdmin: user ? !!user.isAdmin : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
