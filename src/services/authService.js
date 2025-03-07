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
};

export default authService;
