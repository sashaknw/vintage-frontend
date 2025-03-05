import api from "./api";

const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post("/api/auth/signup", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Log in a user
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Log out a user
  logout: () => {
    localStorage.removeItem("token");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Get the current user's information
  getCurrentUser: async () => {
    const response = await api.get("/api/auth/verify");
    return response.data;
  },
};

export default authService;
