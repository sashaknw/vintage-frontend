import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api"; // Adjust the path as needed

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: initialCategory,
    era: "all",
    size: "all",
    priceRange: "all",
    condition: "all",
    sortBy: "newest",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        // Construct query parameters based on filters
        const queryParams = new URLSearchParams();

        if (filters.category !== "all") {
          queryParams.append("category", filters.category);
        }
        if (filters.era !== "all") {
          queryParams.append("era", filters.era);
        }
        if (filters.size !== "all") {
          queryParams.append("size", filters.size);
        }
        if (filters.condition !== "all") {
          queryParams.append("condition", filters.condition);
        }

        // Fetch items from API
        const response = await api.get(`/api/items?${queryParams.toString()}`);

        let filteredItems = response.data;

        // Apply price range filter
        if (filters.priceRange !== "all") {
          switch (filters.priceRange) {
            case "under30":
              filteredItems = filteredItems.filter((item) => item.price < 30);
              break;
            case "30to50":
              filteredItems = filteredItems.filter(
                (item) => item.price >= 30 && item.price <= 50
              );
              break;
            case "50to100":
              filteredItems = filteredItems.filter(
                (item) => item.price > 50 && item.price <= 100
              );
              break;
            case "over100":
              filteredItems = filteredItems.filter((item) => item.price > 100);
              break;
          }
        }

        // Apply sorting
        switch (filters.sortBy) {
          case "priceLow":
            filteredItems.sort((a, b) => a.price - b.price);
            break;
          case "priceHigh":
            filteredItems.sort((a, b) => b.price - a.price);
            break;
          case "newest":
            // Assuming you have a createdAt field
            filteredItems.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;
        }

        setItems(filteredItems);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items");
        setLoading(false);
      }
    };

    fetchItems();
  }, [filters]);

  // Rest of the component remains the same as in your original code
  // ... (keep all the existing filter options, handleFilterChange, etc.)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ... existing JSX ... */}

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No items found matching your filters.
          </p>
          <button
            onClick={() =>
              setFilters({
                category: "all",
                era: "all",
                size: "all",
                priceRange: "all",
                condition: "all",
                sortBy: "newest",
              })
            }
            className="text-amber-700 hover:text-amber-900 underline"
          >
            Clear filters and try again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              to={`/item/${item._id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                <img
                  src={item.images[0]} // Use first image from Cloudinary
                  alt={item.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-amber-600 mb-1">
                      {item.era} • {item.size}
                    </p>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="font-medium text-amber-700">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                    {item.condition}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ... rest of the existing component ... */}
    </div>
  );
};

export default Shop;
