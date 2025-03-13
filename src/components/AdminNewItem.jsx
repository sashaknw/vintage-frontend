import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminNewItem = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    size: "",
    brand: "",
    condition: "Good",
    era: "",
    images: ["", ""],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFiles, setImageFiles] = useState([null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null]);

  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/shop");
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (value === "" || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = previewUrl;
    setImagePreviews(newPreviews);

    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.size
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!imageFiles[0]) {
      setError("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const uploadedImageUrls = [];

      for (let i = 0; i < imageFiles.length; i++) {
        if (imageFiles[i]) {
          const imageFormData = new FormData();
          imageFormData.append("image", imageFiles[i]);

          // Fixed endpoint for image upload - changed from /api/upload to /api/items/upload
          const imageUploadResponse = await api.post(
            "/api/items/upload",
            imageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          uploadedImageUrls.push(imageUploadResponse.data.imageUrl);
        }
      }

      // Create item with uploaded image URLs
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        images: uploadedImageUrls,
      };

      const response = await api.post("/api/items", itemData);

      // Redirect to the newly created item
      navigate(`/item/${response.data._id}`);
    } catch (err) {
      console.error("Error creating item:", err);
      setError(err.response?.data?.message || "Failed to create new item");
      setLoading(false);
    }
  };

  // Options for dropdowns
  const categoryOptions = [
    { value: "", label: "Select a category" },
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "dresses", label: "Dresses" },
    { value: "outerwear", label: "Outerwear" },
    { value: "accessories", label: "Accessories" },
    { value: "shoes", label: "Shoes" },
  ];

  const sizeOptions = [
    { value: "", label: "Select a size" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "One Size", label: "One Size" },
  ];

  const conditionOptions = [
    { value: "Mint", label: "Mint" },
    { value: "Good", label: "Good" },
    { value: "Rugged", label: "Rugged" },
  ];

  const eraOptions = [
    { value: "", label: "Select an era" },
    { value: "50s", label: "1950s" },
    { value: "60s", label: "1960s" },
    { value: "70s", label: "1970s" },
    { value: "80s", label: "1980s" },
    { value: "90s", label: "1990s" },
    { value: "y2k", label: "Y2K (2000s)" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/shop" className="text-black hover:text-amber-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    {sizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    {conditionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="era"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Era
                  </label>
                  <select
                    id="era"
                    name="era"
                    value={formData.era}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {eraOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images <span className="text-red-500">*</span>
                  </label>

                  <div className="mb-3 border border-gray-300 rounded-md p-3">
                    <div className="text-sm font-medium mb-2">
                      Primary Image (required)
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 overflow-hidden">
                        {imagePreviews[0] ? (
                          <img
                            src={imagePreviews[0]}
                            alt="Primary preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-grow">
                        <input
                          type="file"
                          id="image1"
                          onChange={(e) => handleImageChange(e, 0)}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="image1"
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer inline-block text-sm"
                        >
                          {imagePreviews[0] ? "Change Image" : "Upload Image"}
                        </label>
                        {imagePreviews[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreviews([null, imagePreviews[1]]);
                              setImageFiles([null, imageFiles[1]]);
                            }}
                            className="ml-2 text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 border border-gray-300 rounded-md p-3">
                    <div className="text-sm font-medium mb-2">
                      Secondary Image (hover effect)
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 overflow-hidden">
                        {imagePreviews[1] ? (
                          <img
                            src={imagePreviews[1]}
                            alt="Secondary preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-grow">
                        <input
                          type="file"
                          id="image2"
                          onChange={(e) => handleImageChange(e, 1)}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="image2"
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer inline-block text-sm"
                        >
                          {imagePreviews[1] ? "Change Image" : "Upload Image"}
                        </label>
                        {imagePreviews[1] && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreviews([imagePreviews[0], null]);
                              setImageFiles([imageFiles[0], null]);
                            }}
                            className="ml-2 text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Link
                to="/shop"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-[#feff26] text-black border border-black rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNewItem;
