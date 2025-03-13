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
    <div className="w-full bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            to="/community"
            className="text-white hover:text-gray-300 flex items-center transition-colors"
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
          <h1 className="text-3xl font-bold text-white mt-2">
            My Followed Topics
          </h1>
          <p className="text-gray-400 mt-1">Topics you're following</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-300">Loading your followed topics...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : followedTopics.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
            <p className="text-gray-700 mb-4">
              You're not following any topics yet.
            </p>
            <p className="text-gray-600 mb-4">
              When you follow a topic, you'll see it listed here for easy
              access.
            </p>
            <Link
              to="/community"
              className="inline-block px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-black">
                You're following {followedTopics.length}{" "}
                {followedTopics.length === 1 ? "topic" : "topics"}
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {followedTopics.map((topic) => (
                <div
                  key={topic._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <Link
                    to={`/community/topic/${topic._id}`}
                    className="block group"
                  >
                    <h3 className="font-medium text-black group-hover:text-[#feff26] group-hover:bg-black transition-colors">
                      {topic.title}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>
                        Posted by {topic.author?.name || "Unknown"} •{" "}
                      </span>
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
    </div>
  );
};

export default FollowedTopicsPage;
