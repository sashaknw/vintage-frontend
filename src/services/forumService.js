import api from "./api";

const forumService = {
  getCategories: async () => {
    const response = await api.get("/api/forum/categories");
    return response.data;
  },

  getCategoryWithTopics: async (categoryId) => {
    const response = await api.get(`/api/forum/categories/${categoryId}`);
    return response.data;
  },

  getTopicWithReplies: async (topicId) => {
    const response = await api.get(`/api/forum/topics/${topicId}`);
    return response.data;
  },

  createTopic: async (topicData) => {
    const response = await api.post("/api/forum/topics", topicData);
    return response.data;
  },

  // New method for updating topics
  updateTopic: async (topicId, data) => {
    const response = await api.put(`/api/forum/topics/${topicId}`, data);
    return response.data;
  },

  // New method for deleting topics
  deleteTopic: async (topicId) => {
    const response = await api.delete(`/api/forum/topics/${topicId}`);
    return response.data;
  },

  followTopic: async (topicId) => {
    const response = await api.post(`/api/forum/topics/${topicId}/follow`);
    return response.data;
  },

  createReply: async (topicId, content) => {
    const response = await api.post(`/api/forum/topics/${topicId}/replies`, {
      content,
    });
    return response.data;
  },

  // New method for deleting replies
  deleteReply: async (replyId) => {
    const response = await api.delete(`/api/forum/replies/${replyId}`);
    return response.data;
  },

  likeReply: async (replyId) => {
    const response = await api.post(`/api/forum/replies/${replyId}/like`);
    return response.data;
  },

  getFollowedTopics: async () => {
    const response = await api.get("/api/forum/user/followed-topics");
    return response.data;
  },

  searchTopics: async (query) => {
    const response = await api.get(
      `/api/forum/search?query=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

export default forumService;
