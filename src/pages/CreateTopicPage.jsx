// pages/CreateTopicPage.jsx - Create new topic
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";

const CreateTopicPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await forumService.getCategoryWithTopics(categoryId);
        setCategory(data.category);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category");
        setLoading(false);
      }
    };

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/community/category/${categoryId}/new` },
      });
      return;
    }

    fetchCategory();
  }, [categoryId, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const newTopic = await forumService.createTopic(categoryId, {
        title: formData.title,
        content: formData.content,
        
      });

      // Redirect to the new topic
      navigate(`/community/topic/${newTopic._id}`);
    } catch (err) {
      console.error("Error creating topic:", err);
      setError(err.response?.data?.message || "Failed to create topic");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-amber-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-red-600">{error}</p>
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
      <div className="mb-6">
        <Link
          to={`/community/category/${categoryId}`}
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
          Back to {category?.name || "Category"}
        </Link>
        <h1 className="text-3xl font-serif font-bold text-amber-900 mt-2">
          Create New Topic
        </h1>
        <p className="text-gray-600 mt-1">in {category?.name || "Category"}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Topic Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to={`/community/category/${categoryId}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-amber-700 text-white rounded-md ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-amber-800"
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTopicPage;
