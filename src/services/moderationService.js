import api from "./api";

export const getPendingModerations = async () => {
  try {
    const response = await api.get("/api/moderation/pending");
    return response;
  } catch (error) {
    console.error("Error fetching pending moderations:", error);
    throw error;
  }
};

export const processModerationDecision = async (
  moderationId,
  decision,
  notes = "",
  modifiedContent = null
) => {
  try {
    const payload = {
      decision,
      notes,
    };

    if (modifiedContent) {
      payload.modifiedContent = modifiedContent;
    }

    const response = await api.post(
      `/api/moderation/${moderationId}/process`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error processing moderation decision:", error);
    throw error;
  }
};

export const getContentImprovement = async (moderationId) => {
  try {
    const response = await api.get(
      `/api/moderation/${moderationId}/suggest-improvement`
    );
    return response;
  } catch (error) {
    console.error("Error getting content improvement:", error);
    throw error;
  }
};

export const getModerationReport = async () => {
  try {
    const response = await api.get("/api/moderation/report");
    return response;
  } catch (error) {
    console.error("Error fetching moderation report:", error);
    throw error;
  }
};

export const getModerationSettings = async () => {
  try {
    const response = await api.get("/api/moderation/settings");
    return response;
  } catch (error) {
    console.error("Error fetching moderation settings:", error);
    throw error;
  }
};

export const updateModerationSettings = async (settings) => {
  try {
    const response = await api.put("/api/moderation/settings", settings);
    return response;
  } catch (error) {
    console.error("Error updating moderation settings:", error);
    throw error;
  }
};
