// pages/CategoryPage.jsx - Single category with topics
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import forumService from "../services/forumService";
import TopicList from "../components/forum/TopicList";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-amber-700">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-red-600">{error || "Category not found"}</p>
          <Link
            to="/community"
            className="text-amber-700 hover:text-amber-900 mt-4 inline-block"
          >
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
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
          <h1 className="text-3xl font-serif font-bold text-black mt-2">
            {category.icon} {category.name}
          </h1>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>
      </div>

      <TopicList
        topics={topics}
        categoryId={categoryId}
        categoryName={category.name}
      />
    </div>
  );
};

export default CategoryPage;
