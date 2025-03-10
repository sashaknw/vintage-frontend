// components/forum/ForumCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import forumService from "../../services/forumService";
import { motion } from "framer-motion";

const ForumCategories = ({ isDarkTheme = false, cardStyle = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await forumService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load forum categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className={isDarkTheme ? "text-gray-300" : "text-gray-500"}>
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Card-style categories for modern design - ALL BLACK
  if (cardStyle) {
    return (
      <>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {categories.map((category) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              className="relative group"
            >
              <Link
                to={`/community/category/${category._id}`}
                className="block"
              >
                <div className="relative flex items-center justify-center h-16 md:h-20 bg-black rounded-xl border-2 border-white overflow-hidden group-hover:border-transparent transition-all duration-300">
                  {/* SVG for animated dashed outline */}
                  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
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

                  <h3 className="text-xl md:text-2xl font-medium text-white hover:text-[#feff27] z-10">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
      </>
    );
  }

  // Original list style
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => (
        <motion.div
          key={category._id}
          variants={itemVariants}
          className={`${
            isDarkTheme
              ? "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
              : "bg-white hover:bg-gray-50"
          } rounded-lg shadow overflow-hidden`}
        >
          <Link to={`/community/category/${category._id}`}>
            <div className="p-4 border-b border-gray-200 flex items-center transition-colors">
              <span className="text-2xl mr-3">{category.icon}</span>
              <div>
                <h2
                  className={`text-xl font-medium ${
                    isDarkTheme ? "text-white" : "text-black" 
                  }`}
                >
                  {category.name}
                </h2>
                <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForumCategories;
