// pages/FollowedTopicsPage.jsx - User's followed topics
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";
import { formatDistanceToNow } from "date-fns";

const FollowedTopicsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [followedTopics, setFollowedTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/community/followed" } });
      return;
    }

    const fetchFollowedTopics = async () => {
      try {
        setLoading(true);
        const data = await forumService.getFollowedTopics();
        setFollowedTopics(data);
      } catch (err) {
        console.error("Error fetching followed topics:", err);
        setError("Failed to load your followed topics");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedTopics();
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/community"
          className="text-amber-700 hover:text-amber-900 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Forum
        </Link>
        <h1 className="text-3xl font-serif font-bold text-amber-900 mt-2">
          My Followed Topics
        </h1>
        <p className="text-gray-600 mt-1">Topics you're following</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-amber-700">Loading your followed topics...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      ) : followedTopics.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-700 mb-4">
            You're not following any topics yet.
          </p>
          <p className="text-gray-600 mb-4">
            When you follow a topic, you'll see it listed here for easy access.
          </p>
          <Link
            to="/community"
            className="inline-block px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-amber-900">
              You're following {followedTopics.length}{" "}
              {followedTopics.length === 1 ? "topic" : "topics"}
            </h2>
          </div>

          <div className="divide-y">
            {followedTopics.map((topic) => (
              <div
                key={topic._id}
                className="p-4 hover:bg-amber-50 transition-colors"
              >
                <Link to={`/community/topic/${topic._id}`} className="block">
                  <h3 className="font-medium text-amber-900 hover:text-amber-700">
                    {topic.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>Posted by {topic.author?.name || "Unknown"} • </span>
                    <span>
                      Last activity{" "}
                      {formatDistanceToNow(new Date(topic.lastActivity), {
                        addSuffix: true,
                      })}{" "}
                      •
                    </span>
                    <span>in {topic.category?.name}</span>
                  </div>
                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {topic.content.substring(0, 150)}
                    {topic.content.length > 150 ? "..." : ""}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowedTopicsPage;
