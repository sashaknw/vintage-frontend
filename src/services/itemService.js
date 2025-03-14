import api from "./api";

const itemService = {
  getAllItems: async () => {
    const response = await api.get("/api/items");
    return response.data;
  },

  getItem: async (id) => {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  },

  createItem: async (itemData) => {
    const response = await api.post("/api/items", itemData);
    return response.data;
  },

  updateItem: async (id, itemData) => {
    const response = await api.put(`/api/items/${id}`, itemData);
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/api/items/${id}`);
    return response.data;
  },
};

export default itemService;
