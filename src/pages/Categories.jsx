import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Predefined category details
  const CATEGORY_DETAILS = {
    tops: {
      description: "Vintage t-shirts, blouses, and shirts",
      displayName: "Tops",
    },
    bottoms: {
      description: "Vintage jeans, skirts, and pants",
      displayName: "Bottoms",
    },
    dresses: {
      description: "Vintage dresses from all eras",
      displayName: "Dresses",
    },
    outerwear: {
      description: "Vintage jackets, coats, and sweaters",
      displayName: "Outerwear",
    },
    accessories: {
      description: "Vintage bags, jewelry, and more",
      displayName: "Accessories",
    },
    shoes: {
      description: "Vintage footwear for all occasions",
      displayName: "Shoes",
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/items");
        const items = response.data;

        // Calculate category counts and find representative images
        const categoriesData = Object.keys(CATEGORY_DETAILS).map(
          (categoryKey) => {
            const categoryItems = items.filter(
              (item) => item.category === categoryKey
            );

            // Get up to 2 images for each category (for the hover effect)
            const categoryImages = [];
            if (
              categoryItems.length > 0 &&
              categoryItems[0].images &&
              categoryItems[0].images.length > 0
            ) {
              categoryImages.push(categoryItems[0].images[0]);
            } else {
              categoryImages.push("https://via.placeholder.com/600x400");
            }

            // Try to get a second image from another item in the category
            if (
              categoryItems.length > 1 &&
              categoryItems[1].images &&
              categoryItems[1].images.length > 0
            ) {
              categoryImages.push(categoryItems[1].images[0]);
            } else if (
              categoryItems.length > 0 &&
              categoryItems[0].images &&
              categoryItems[0].images.length > 1
            ) {
              // Or use the second image of the first item if available
              categoryImages.push(categoryItems[0].images[1]);
            } else {
              // Fallback to the first image if no second is available
              categoryImages.push(categoryImages[0]);
            }

            return {
              id: categoryKey,
              name: CATEGORY_DETAILS[categoryKey].displayName,
              description: CATEGORY_DETAILS[categoryKey].description,
              count: categoryItems.length,
              images: categoryImages,
            };
          }
        );

        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-center text-black mb-12">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${category.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64 bg-gray-50">
                {/* Primary image */}
                <img
                  src={category.images[0]}
                  alt={category.name}
                  className="w-full h-full object-contain transition duration-300 group-hover:opacity-0"
                />

                {/* Secondary image (shown on hover) */}
                {category.images[1] && (
                  <img
                    src={category.images[1]}
                    alt={`${category.name} alternate`}
                    className="w-full h-full object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                  />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition duration-300"></div>
              </div>
              <div className="bg-white p-6">
                <h2 className="text-xl font-medium text-black mb-2 group-hover:text-gray-700">
                  {category.name}
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({category.count})
                  </span>
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
