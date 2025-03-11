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
      <div className="w-full py-8 text-center">
        <p className={isDarkTheme ? "text-gray-300" : "text-gray-500"}>
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
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
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                className="block w-full"
              >
                <div className="relative flex items-center justify-center h-16 md:h-20 bg-black rounded-xl border-2 border-white overflow-hidden group-hover:border-transparent transition-all duration-300">
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

                  <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-[#feff27] transition-colors duration-300 z-10">
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

  // Updated list style to match Community theme
  return (
    <motion.div
      className="w-full space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => (
        <motion.div
          key={category._id}
          variants={itemVariants}
          className="bg-black rounded-3xl border-2 border-white overflow-hidden"
        >
          <Link
            to={`/community/category/${category._id}`}
            className="block w-full"
          >
            <div className="p-6 flex items-center justify-between transition-colors group hover:bg-white/5">
              <div className="flex items-center">
                <span className="text-2xl mr-3 text-white">
                  {category.icon}
                </span>
                <div>
                  <h2 className="text-xl font-medium text-white group-hover:text-[#feff27] transition-colors duration-300">
                    {category.name}
                  </h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForumCategories;
