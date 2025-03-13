import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";

const NewCategoryPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🔍", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const iconOptions = [
    "🔍",
    "💡",
    "💬",
    "🛍️",
    "👕",
    "👖",
    "👗",
    "👔",
    "🧥",
    "👠",
    "🎩",
    "👜",
    "🎒",
    "💼",
    "🧳",
    "📚",
    "🎮",
    "🎵",
    "🎬",
    "🎨",
  ];

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/community");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIconSelect = (icon) => {
    setFormData((prevData) => ({
      ...prevData,
      icon,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      setError("Name and description are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await forumService.createCategory(formData);

      navigate("/community");
    } catch (err) {
      console.error("Error creating category:", err);
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
       
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/community"
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            Back to Community
          </Link>
          <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full border border-white">
            Admin: New Category
          </div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Create New Category</h1>
            <p className="text-gray-600 mt-1">
              Add a new category to the community forum
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
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Vintage Fashion"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
                placeholder="Describe what this category is about..."
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select an Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleIconSelect(icon)}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded-md hover:bg-gray-100 ${
                      formData.icon === icon
                        ? "bg-amber-100 border-2 border-amber-500"
                        : "border border-gray-300"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-gray-600 text-sm">
                Selected icon: <span className="text-xl">{formData.icon}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Link
                to="/community"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-[#feff27] text-black rounded-md hover:bg-yellow-300 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryPage;
