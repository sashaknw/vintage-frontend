// components/forum/ForumCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import forumService from "../../services/forumService";
import { motion } from "framer-motion";

const ForumCategories = ({ isDarkTheme = false }) => {
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
        <p className={isDarkTheme ? "text-gray-300" : "text-amber-700"}>
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

  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
              : "bg-white hover:bg-amber-50"
          } rounded-lg shadow overflow-hidden`}
        >
          <Link to={`/community/category/${category._id}`}>
            <div className="p-4 border-b border-zinc-700 flex items-center transition-colors">
              <span className="text-2xl mr-3">{category.icon}</span>
              <div>
                <h2
                  className={`text-xl font-medium ${
                    isDarkTheme ? "text-white" : "text-black"
                  }`}
                >
                  {category.name}
                </h2>
                <p
                  className={isDarkTheme ? "text-gray-400" : "text-gray-600"} 
                 
                >
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
