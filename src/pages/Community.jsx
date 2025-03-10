// pages/Community.jsx - Main forum page with black and white theme and video background
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForumCategories from "../components/forum/ForumCategories";
import { motion } from "framer-motion";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to search results page
    if (searchQuery.trim()) {
      window.location.href = `/community/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <div>
      {/* Hero Section with Video */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "50vh", minHeight: "400px" }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dlkmeyasv/video/upload/v1741611395/shopping_xkucaq.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl"
          >
            <h1 className="text-5xl font-serif font-bold text-white">
              Community Forum
            </h1>
            <p className="text-xl text-gray-200">
              Connect with fellow vintage enthusiasts, share your style journey,
              and discover timeless inspiration.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <form onSubmit={handleSearch} className="flex-grow max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search the forum..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border-2 border-white bg-black/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300 backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white hover:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Black Background */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center mb-12">
            <h2 className="text-3xl font-serif font-bold">
              Join The Conversation
            </h2>
            <Link
              to="/community/followed"
              className="px-4 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
            >
              My Followed Topics
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-12"
          >
            <h2 className="text-xl font-medium text-white mb-4">
              Welcome to Our Community
            </h2>
            <p className="text-gray-300 mb-4">
              This is a space for our community to connect, share ideas, and
              discuss everything related to sustainable fashion and vintage
              clothing. Join the conversation by exploring our categories below.
            </p>
            <div className="text-gray-300">
              <p className="font-medium text-white">
                Our community guidelines:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Be kind and respectful to fellow members</li>
                <li>Share your knowledge and experiences</li>
                <li>Keep discussions relevant to the topic</li>
                <li>No spam or self-promotion without permission</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ForumCategories isDarkTheme={true} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;
