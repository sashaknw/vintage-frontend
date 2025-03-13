import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";

const EditCategoryPage = () => {
  const { categoryId } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🔍",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    const checkAuthAndFetchCategory = async () => {
      try {
        if (!isAuthenticated || !isAdmin) {
          navigate("/community");
          return;
        }

        setIsLoading(true);
        const category = await forumService.getCategory(categoryId);

        setFormData({
          name: category.name,
          description: category.description,
          icon: category.icon || "🔍",
        });
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load category data");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchCategory();
  }, [isAuthenticated, isAdmin, navigate, categoryId]);

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

      await forumService.updateCategory(categoryId, formData);

      navigate(`/community/category/${categoryId}`);
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || "Failed to update category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? All topics within it will be deleted. This action cannot be undone."
      )
    ) {
      try {
        setIsSubmitting(true);
        await forumService.deleteCategory(categoryId);
        navigate("/community");
      } catch (err) {
        console.error("Error deleting category:", err);
        setError(err.response?.data?.message || "Failed to delete category");
        setIsSubmitting(false);
      }
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
          <Link
            to={`/community/category/${categoryId}`}
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            Back to Category
          </Link>
          <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full border border-white">
            Admin: Edit Category
          </div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Edit Category</h1>
            <p className="text-gray-600 mt-1">Update category details</p>
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

            {/* Submit and Delete Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Category
              </button>

              <div className="flex gap-2">
                <Link
                  to={`/community/category/${categoryId}`}
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
                  {isSubmitting ? "Saving..." : "Update Category"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage;
