// pages/CategoryPage.jsx - Modern design with black topic cards
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import forumService from "../services/forumService";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "../helpers/dateUtils";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("latest"); // "latest", "popular", "oldest"

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const data = await forumService.getCategoryWithTopics(categoryId);
        setCategory(data.category);
        setTopics(data.topics);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  // Sort topics based on filter
  const sortedTopics = [...topics].sort((a, b) => {
    if (filter === "latest") {
      return new Date(b.lastActivity) - new Date(a.lastActivity);
    } else if (filter === "oldest") {
      return new Date(a.lastActivity) - new Date(b.lastActivity);
    } else if (filter === "popular") {
      return b.replyCount - a.replyCount;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 bg-black min-h-screen">
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 bg-black min-h-screen">
        <div className="py-8 text-center">
          <p className="text-red-600">{error || "Category not found"}</p>
          <Link
            to="/community"
            className="text-black hover:underline mt-4 inline-block"
          >
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-black min-h-screen">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/community"
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            Community
          </Link>
          <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full">
            {category.name}
          </div>
        </div>
      </div>

      {/* Category Header Card */}
      <div className="bg-black text-white p-6 rounded-3xl mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{category.icon}</span>
              <h1 className="text-2xl font-bold">{category.name}</h1>
            </div>
            <p className="text-gray-300 mb-4">{category.description}</p>

            <Link
              to={`/community/category/${categoryId}/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              New Topic
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {topics.length} topics
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm border-0 text-white cursor-pointer focus:ring-0"
            >
              <option value="latest">Latest Activity</option>
              <option value="popular">Most Replies</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics Grid - All Black with White Text */}
      <div className="space-y-4">
        {sortedTopics.length === 0 ? (
          <div className="text-center py-8 bg-black rounded-3xl">
            <p className="text-white mb-4">No topics yet in this category.</p>
            <Link
              to={`/community/category/${categoryId}/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Be the first to start a topic
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {sortedTopics.map((topic) => (
              <Link
                key={topic._id}
                to={`/community/topic/${topic._id}`}
                className="relative group"
              >
                <div className="relative flex flex-col items-center justify-center h-24 md:h-28 bg-black rounded-xl border-2 border-white overflow-hidden group-hover:border-transparent transition-all duration-300 px-3">
                  {/* SVG for animated dashed outline */}
                  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <rect
                      width="100%"
                      height="100%"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="10,10"
                      strokeLinecap="round"
                      rx="12"
                      ry="12"
                      className="dash-animation"
                    />
                  </svg>

                  <h3 className="text-xl md:text-2xl font-medium text-white z-10 text-center mb-1">
                    {topic.title}
                  </h3>

                  {/* Small data display at bottom */}
                  <div className="text-xs text-gray-400 z-10 flex items-center gap-2">
                    <span>{topic.replyCount} replies</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(topic.lastActivity))}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>

      {/* Pagination (if needed) */}
      {topics.length > 0 && topics.length > 9 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-sm disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">Page 1 of 1</span>
            <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-sm disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}

      {/* CSS for animated dashed outline */}
      <style jsx="true">{`
        .dash-animation {
          stroke-dashoffset: 0;
          animation: dash 20s linear infinite;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 500;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
