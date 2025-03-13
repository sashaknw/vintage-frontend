import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";

const AdminNewTopicPage = () => {
  const { categoryId } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
    isAdminPost: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthAndFetchCategories = async () => {
      try {
        if (!isAuthenticated || !isAdmin) {
          navigate("/community");
          return;
        }

        setIsLoading(true);
        const data = await forumService.getCategories();
        setCategories(data);

        if (categoryId && !selectedCategory) {
          setSelectedCategory(categoryId);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchCategories();
  }, [isAuthenticated, isAdmin, navigate, categoryId, selectedCategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !selectedCategory) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const newTopic = await forumService.createTopic(selectedCategory, {
        ...formData,
        isAdminPost: true,
      });

      navigate(`/community/topic/${newTopic._id}`);
    } catch (err) {
      console.error("Error creating topic:", err);
      setError(err.response?.data?.message || "Failed to create topic");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center py-8">
            <p className="text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/community"
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            Community
          </Link>
          {selectedCategory && (
            <Link
              to={`/community/category/${selectedCategory}`}
              className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
            >
              {categories.find((c) => c._id === selectedCategory)?.name ||
                "Category"}
            </Link>
          )}
          <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full border border-white">
            Admin: New Topic
          </div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Create New Topic as Admin</h1>
            <p className="text-gray-600 mt-1">
              Create an official announcement or topic
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
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
                placeholder="Enter a descriptive title..."
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 font-medium mb-2"
              >
                Topic Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[200px]"
                placeholder="Write your topic content here..."
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  name="isPinned"
                  checked={formData.isPinned}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="isPinned" className="ml-2 block text-gray-700">
                  Pin this topic to the top
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1 ml-6">
                Pinned topics appear at the top of the category page
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Link
                to={
                  selectedCategory
                    ? `/community/category/${selectedCategory}`
                    : "/community"
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Admin Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNewTopicPage;
