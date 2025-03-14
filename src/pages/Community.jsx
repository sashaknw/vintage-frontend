// pages/Community.jsx with admin controls
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForumCategories from "../components/forum/ForumCategories";
import ForumAdminControls from "../components/forum/ForumAdminControls";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUsers] = useState(42); // Mock data
  const [totalTopics] = useState(58); // Mock data
  const { isAdmin } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/community/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <div className="w-screen-2xl mx-auto px-28 py-10 bg-black min-h-screen">
      <div className="grid grid-cols-1 gap-5">
        <div className="relative p-6 rounded-3xl overflow-hidden h-96">
          <div className="absolute inset-0 mx-6 h-full">
            <video
              className="w-full h-full object-cover rounded-3xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dlkmeyasv/video/upload/v1741611395/shopping_xkucaq.mp4"
                type="video/mp4"
              />
              <div className="absolute inset-0 bg-black"></div>
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>
          </div>

          <div className="relative z-10 mx-6 flex flex-col h-full">
            <div>
              <h1 className="text-4xl font-bold mb-1 text-white">
                Community Forum
              </h1>
              <p className="text-gray-300 mb-6">
                Connect with fellow vintage enthusiasts and share your style
                journey
              </p>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-auto">
                <form onSubmit={handleSearch} className="flex-grow max-w-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent px-6 py-2 rounded-full border border-white text-white text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/10 transition-colors"
                  />
                </form>
              </div>

              {isAdmin && (
                <div className="mt-4">
                  <Link
                    to="/community/new-topic"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#feff27] text-black rounded-full text-sm hover:bg-yellow-300 transition-colors"
                  >
                    Admin: Add New Topic
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
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-bold py-4 text-white text-left">
              Hot Topics
            </h2>

            <ForumAdminControls page="community" />
          </div>

          <ForumCategories cardStyle={true} />
        </div>
        <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl border-2 border-white">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-xs font-medium uppercase tracking-wider text-white">
                FORUM ACTIVITY
              </span>
              <span className="h-6 w-6 flex items-center justify-center rounded-full bg-[#feff27]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-4xl text-white font-bold">
                  {activeUsers}
                </div>
                <div className="text-white text-sm">Active users</div>
              </div>
              <div>
                <div className="text-4xl text-white font-bold">
                  {totalTopics}
                </div>
                <div className="text-white text-sm">Total topics</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-white font-medium">
                  Latest activity
                </div>
                <div className="text-xs text-white">Last 7 days</div>
              </div>
              <div className="flex items-end h-10 gap-1">
                <div className="bg-white h-3 w-full rounded-sm"></div>
                <div className="bg-white h-4 w-full rounded-sm"></div>
                <div className="bg-white h-5 w-full rounded-sm"></div>
                <div className="bg-white h-7 w-full rounded-sm"></div>
                <div className="bg-white h-6 w-full rounded-sm"></div>
                <div className="bg-white h-9 w-full rounded-sm"></div>
                <div className="bg-[#feff27] h-10 w-full rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border-2 border-white">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-xs text-white font-medium uppercase tracking-wider">
                GUIDELINES
              </span>
              <span className="h-6 w-6 flex items-center justify-center rounded-full bg-[#feff27]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <div className="text-white">
              <p className="mb-3 font-medium">Our community guidelines:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#feff27]"></span>
                  <span className="text-sm">
                    Be kind and respectful to others
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#feff27]"></span>
                  <span className="text-sm">
                    Share your knowledge and experiences
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#feff27]"></span>
                  <span className="text-sm">
                    Keep discussions relevant to topics
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#feff27]"></span>
                  <span className="text-sm">No spam or self-promotion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
