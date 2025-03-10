// authService.js - API calls
import api from "./api";

const authService = {
  register: async (userData) => {
    const response = await api.post("/api/auth/signup", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    const response = await api.get("/api/auth/verify");
    return response.data;
  },



  getProfile: async () => {
    const response = await api.get("/api/users/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/api/users/profile", userData);
    return response.data;
  },

  getPublicProfile: async (userId) => {
    const response = await api.get(`/api/users/${userId}/public`);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete("/api/users/account");
    localStorage.removeItem("token");
    return response.data;
  },

  uploadProfilePicture: async (formData) => {
    const response = await api.post("/api/users/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
    updatePassword: async (passwordData) => {
    const response = await api.put("/api/users/password", passwordData);
    return response.data;
  }
};


export default authService;
