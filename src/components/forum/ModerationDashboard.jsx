import React, { useState, useEffect } from "react";
import {
  getPendingModerations,
  processModerationDecision,
  getContentImprovement,
  getModerationReport,
  getModerationSettings,
  updateModerationSettings,
} from "../../services/moderationService";

// Notification component for action feedback
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

  return (
    <div
      className={`${bgColor} px-4 py-3 rounded border mb-4 flex justify-between items-center`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-800"
      >
        ×
      </button>
    </div>
  );
};

const ModerationItem = ({ item, onApprove, onReject, onModify }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [suggestionContent, setSuggestionContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getContent = () => {
    if (item.contentId?.content) {
      return item.contentId.content;
    }
    return item.originalContent || "";
  };

  const formatScore = (score) => {
    return `${Math.round(score * 100)}%`;
  };

  const getScoreColorClass = (score) => {
    if (score >= 0.7) return "text-red-600";
    if (score >= 0.4) return "text-orange-500";
    return "text-green-600";
  };

  const handleGetSuggestion = async () => {
    try {
      setIsLoadingSuggestion(true);
      const response = await getContentImprovement(item._id);
      const suggestedImprovement =
        response.data?.data?.suggestedImprovement ||
        response.data?.suggestedImprovement;

      if (suggestedImprovement) {
        setSuggestionContent(suggestedImprovement);
        setEditedContent(suggestedImprovement);
        setShowSuggestion(true);
      } else {
        throw new Error("No suggestion received from server");
      }

      setIsLoadingSuggestion(false);
    } catch (error) {
      console.error("Error getting suggestion:", error);
      setIsLoadingSuggestion(false);
    }
  };

  const handleEditContent = () => {
    setIsEditing(true);
    setEditedContent(suggestionContent || getContent());
  };

  const handleSaveEdit = () => {
    onModify(item._id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {item.contentType === "topic" ? "Topic: " : "Reply: "}
            <span className="font-normal">
              {item.contentId?.title ||
                item.originalContent?.substring(0, 30) ||
                "Unknown content"}
              ...
            </span>
          </h3>
          <div className="flex items-center mt-1 space-x-3">
            <span
              className={`font-medium ${getScoreColorClass(
                item.moderationScore
              )}`}
            >
              Score: {formatScore(item.moderationScore)}
            </span>
            <span className="text-sm text-gray-500">
              Posted: {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4">
          <div className="mb-4">
            <h4 className="font-medium mb-1">Original Content:</h4>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-line">
              {getContent()}
            </div>
          </div>

          {item.issues &&
            Array.isArray(item.issues) &&
            item.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-1">Detected Issues:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {item.issues.map((issue, idx) => (
                    <li key={idx} className="mb-1">
                      <strong className="capitalize">{issue.type}:</strong>{" "}
                      {issue.explanation}
                      <span className="ml-1 text-gray-500">
                        (Severity: {formatScore(issue.severity)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {isEditing ? (
            <div className="mb-4">
              <h4 className="font-medium mb-1">Edit Content:</h4>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-40"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {showSuggestion && suggestionContent && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1">Suggested Improvement:</h4>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200 whitespace-pre-line">
                    {suggestionContent}
                  </div>
                  <button
                    onClick={handleEditContent}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Use This Suggestion as Starting Point
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => onApprove(item._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={handleEditContent}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Modify
                </button>
                {!showSuggestion && (
                  <button
                    onClick={handleGetSuggestion}
                    disabled={isLoadingSuggestion}
                    className={`px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                      isLoadingSuggestion ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoadingSuggestion ? "Loading..." : "Get AI Suggestion"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ModerationSettings = ({ settings, onUpdateSettings }) => {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    onUpdateSettings(formData);
    // The parent component will update the state and notify the user
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Moderation Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                <span>Enable AI Moderation</span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Turn content moderation on or off completely
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="autoModerateSafe"
                  checked={formData.autoModerateSafe}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                <span>Auto-approve Safe Content</span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically approve content with very low moderation scores
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="autoRemoveHighRisk"
                  checked={formData.autoRemoveHighRisk}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                <span>Auto-remove High Risk Content</span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically reject content with very high toxicity scores
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block mb-1">
                Toxicity Threshold: {formData.toxicityThreshold}
              </label>
              <input
                type="range"
                name="toxicityThreshold"
                min="0"
                max="1"
                step="0.05"
                value={formData.toxicityThreshold}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Lenient (0)</span>
                <span>Strict (1)</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Content with scores above this threshold will be flagged for
                review
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ModerationReport = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Moderation Report</h2>

      {report ? (
        <div className="prose max-w-none whitespace-pre-line">{report}</div>
      ) : (
        <p className="text-gray-500">No moderation report available.</p>
      )}
    </div>
  );
};

const ModerationDashboard = () => {
  const [activeTab, setActiveTab] = useState("queue");
  const [pendingItems, setPendingItems] = useState([]);
  const [settings, setSettings] = useState({
    enabled: true,
    autoModerateSafe: true,
    autoRemoveHighRisk: false,
    toxicityThreshold: 0.7,
  });
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  // Clear notification
  const clearNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === "queue") {
        try {
          const response = await getPendingModerations();
          console.log("Moderation response:", response);

          if (response && response.data) {
            if (response.data.data && Array.isArray(response.data.data)) {
              setPendingItems(response.data.data);
            } else if (Array.isArray(response.data)) {
              setPendingItems(response.data);
            } else {
              setPendingItems([]);
              console.warn(
                "Received data in unexpected format:",
                response.data
              );
            }
          } else {
            setPendingItems([]);
          }
        } catch (err) {
          console.error("Error in getPendingModerations:", err);
          setPendingItems([]);
          setError(
            "Failed to load moderation queue. The service might be unavailable."
          );
        }
      } else if (activeTab === "settings") {
        try {
          const response = await getModerationSettings();
          console.log("Settings response:", response);

          // Try to extract settings data from different possible structures
          const settingsData = response.data?.data || response.data;

          if (settingsData) {
            console.log("Setting data to:", settingsData);
            setSettings(settingsData);
          } else {
            console.warn("No settings data found in response:", response);
          }
        } catch (err) {
          console.error("Error in getModerationSettings:", err);
          setError("Failed to load settings. Using defaults.");
        }
      } else if (activeTab === "report") {
        try {
          const response = await getModerationReport();
          const reportData =
            response.data?.data?.report ||
            response.data?.report ||
            "No moderation report available.";

          setReport(reportData);
        } catch (err) {
          console.error("Error in getModerationReport:", err);
          setReport("Failed to load moderation report.");
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again.");
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await processModerationDecision(
        id,
        "approved",
        "Content approved by moderator"
      );
      setPendingItems(pendingItems.filter((item) => item._id !== id));
      showNotification("Content approved successfully");
    } catch (error) {
      console.error("Error approving content:", error);
      setError("Failed to approve content");
      showNotification("Failed to approve content", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await processModerationDecision(
        id,
        "rejected",
        "Content rejected by moderator"
      );
      setPendingItems(pendingItems.filter((item) => item._id !== id));
      showNotification("Content rejected successfully");
    } catch (error) {
      console.error("Error rejecting content:", error);
      setError("Failed to reject content");
      showNotification("Failed to reject content", "error");
    }
  };

  const handleModify = async (id, modifiedContent) => {
    try {
      await processModerationDecision(
        id,
        "modified",
        "Content modified by moderator",
        modifiedContent
      );
      setPendingItems(pendingItems.filter((item) => item._id !== id));
      showNotification("Content modified and approved successfully");
    } catch (error) {
      console.error("Error modifying content:", error);
      setError("Failed to modify content");
      showNotification("Failed to modify content", "error");
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    try {
      console.log("Sending settings update:", newSettings);
      const response = await updateModerationSettings(newSettings);
      console.log("Settings update response:", response);

      // Try to extract settings from different possible structures
      const updatedSettings = response.data?.data || response.data;

      if (updatedSettings) {
        console.log("Updated settings:", updatedSettings);
        setSettings(updatedSettings);
        showNotification("Settings updated successfully");
      } else {
        console.warn("No updated settings in response:", response);
        // Even if we can't extract settings, still update local state with what we sent
        setSettings(newSettings);
        showNotification("Settings saved");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      setError("Failed to update settings");
      showNotification("Failed to update settings", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Content Moderation</h1>
        <button
          onClick={fetchData}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("queue")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "queue"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Moderation Queue
              {Array.isArray(pendingItems) && pendingItems.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">
                  {pendingItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === "report"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reports
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : (
        <div>
          {activeTab === "queue" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Moderation Queue</h2>
                <span className="text-sm text-gray-500">
                  {Array.isArray(pendingItems) ? pendingItems.length : 0} items
                  awaiting review
                </span>
              </div>

              {!Array.isArray(pendingItems) || pendingItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-lg text-gray-600">
                    The moderation queue is empty!
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    All content has been reviewed.
                  </p>
                </div>
              ) : (
                <div>
                  {pendingItems.map((item) => (
                    <ModerationItem
                      key={item._id}
                      item={item}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onModify={handleModify}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <ModerationSettings
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          )}

          {activeTab === "report" && <ModerationReport report={report} />}
        </div>
      )}
    </div>
  );
};

export default ModerationDashboard;
