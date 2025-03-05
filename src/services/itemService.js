import api from "./api";

// Functions to interact with the items API
const itemService = {
  // Get all items
  getAllItems: async () => {
    const response = await api.get("/api/items");
    return response.data;
  },

  // Get a single item by ID
  getItem: async (id) => {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  },

  // Create a new item (requires authentication)
  createItem: async (itemData) => {
    const response = await api.post("/api/items", itemData);
    return response.data;
  },

  // Update an item (requires authentication)
  updateItem: async (id, itemData) => {
    const response = await api.put(`/api/items/${id}`, itemData);
    return response.data;
  },

  // Delete an item (requires authentication)
  deleteItem: async (id) => {
    const response = await api.delete(`/api/items/${id}`);
    return response.data;
  },
};

export default itemService;
