import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import forumService from "../services/forumService";
import ForumAdminControls from "../components/forum/ForumAdminControls";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "../helpers/dateUtils";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("latest");
  const { isAdmin } = useAuth();

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
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="py-8 text-center">
            <p className="text-gray-500">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="py-8 text-center">
            <p className="text-red-600">{error || "Category not found"}</p>
            <Link
              to="/community"
              className="text-white hover:text-[#feff27] mt-4 inline-block transition-colors"
            >
              Back to Forum
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/community"
              className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
            >
              Community
            </Link>
            <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full border border-white">
              {category.name}
            </div>
          </div>

          {isAdmin && (
            <Link
              to={`/community/category/${categoryId}/edit`}
              className="text-sm bg-[#feff27] text-black px-4 py-2 rounded-full hover:bg-yellow-300"
            >
              Edit Category
            </Link>
          )}
        </div>

        <div
          className="bg-black text-white p-6 rounded-3xl border-2 border-white mb-6 relative overflow-hidden"
          style={{
            position: "relative",
          }}
        >
          <div
            className="absolute inset-0 z-0 opacity-45"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dlkmeyasv/image/upload/v1741771913/market_nacjhg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{category.name}</h1>
                </div>
                <p className="text-gray-300 mb-4">{category.description}</p>

                <div className="flex gap-2">
                  <Link
                    to={`/community/category/${categoryId}/new`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#feff27] text-black rounded-full text-sm hover:bg-yellow-300 transition-colors"
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
              </div>

              <div className="flex flex-col items-end mt-12">
                <div className="bg-transparent border border-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {topics.length} topics
                </div>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent border border-white px-3 py-1 rounded-full text-sm text-white cursor-pointer focus:ring-0"
                >
                  <option value="latest" className="bg-black text-white">
                    Latest Activity
                  </option>
                  <option value="popular" className="bg-black text-white">
                    Most Replies
                  </option>
                  <option value="oldest" className="bg-black text-white">
                    Oldest First
                  </option>
                </select>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-6 border-t border-white/20 pt-4">
                <ForumAdminControls page="category" categoryId={categoryId} />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {sortedTopics.length === 0 ? (
            <div className="text-center py-8 bg-black rounded-3xl border-2 border-white">
              <p className="text-white mb-4">No topics yet in this category.</p>
              <Link
                to={`/community/category/${categoryId}/new`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#feff27] text-black rounded-full text-sm hover:bg-yellow-300 transition-colors"
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
                  <div className="relative flex flex-col items-center justify-center h-32 md:h-40 bg-black rounded-xl border-2 border-white overflow-hidden group-hover:border-transparent transition-all duration-300 px-4 py-3">
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

                    {topic.isAdminPost && (
                      <span className="absolute top-2 right-2 bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full z-10">
                        Admin
                      </span>
                    )}

                    {topic.isPinned && (
                      <span className="absolute top-2 left-2 z-10">
                        <img
                          src="/pin.svg"
                          alt="Pinned"
                          className="h-5 w-5"
                          title="Pinned Topic"
                        />
                      </span>
                    )}

                    <div className="mt-3 mb-2 z-10">
                      <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-[#feff27] transition-colors duration-300 z-10 text-center">
                        {topic.title}
                      </h3>
                    </div>

                    <div className="text-s text-gray-400 z-10 flex items-center gap-2 mt-auto">
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

        {topics.length > 0 && topics.length > 9 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-sm disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-white">Page 1 of 1</span>
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-sm disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default CategoryPage;
