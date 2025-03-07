import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import FavoriteButton from "../components/FavoriteButton";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

        // Apply search filter
        if (searchTerm) {
          filteredItems = filteredItems.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              item.brand.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

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
  }, [filters, searchTerm]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

   
    if (filterName === "category") {
      if (value === "all") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", value);
      }
      setSearchParams(searchParams);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterOptions = {
    category: [
      { value: "all", label: "All Categories" },
      { value: "tops", label: "Tops" },
      { value: "bottoms", label: "Bottoms" },
      { value: "dresses", label: "Dresses" },
      { value: "outerwear", label: "Outerwear" },
      { value: "accessories", label: "Accessories" },
      { value: "shoes", label: "Shoes" },
    ],
    era: [
      { value: "all", label: "All Eras" },
      { value: "50s", label: "1950s" },
      { value: "60s", label: "1960s" },
      { value: "70s", label: "1970s" },
      { value: "80s", label: "1980s" },
      { value: "90s", label: "1990s" },
      { value: "y2k", label: "Y2K (2000s)" },
    ],
    size: [
      { value: "all", label: "All Sizes" },
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
      { value: "One Size", label: "One Size" },
    ],
    condition: [
      { value: "all", label: "All Conditions" },
      { value: "Mint", label: "Mint" },
      { value: "Good", label: "Good" },
      { value: "Rugged", label: "Rugged" },
    ],
    priceRange: [
      { value: "all", label: "All Prices" },
      { value: "under30", label: "Under 30€" },
      { value: "30to50", label: "30€ - 50€" },
      { value: "50to100", label: "50€ - 100€" },
      { value: "over100", label: "Over 100€" },
    ],
    sortBy: [
      { value: "newest", label: "Newest" },
      { value: "priceLow", label: "Price: Low to High" },
      { value: "priceHigh", label: "Price: High to Low" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-black mb-8">
        Shop Vintage
      </h1>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      {/* Filters Section */}
      <div className="border-2 border-black rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Category Filter */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.category.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Era Filter */}
          <div>
            <label
              htmlFor="era"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Era
            </label>
            <select
              id="era"
              value={filters.era}
              onChange={(e) => handleFilterChange("era", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.era.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Size
            </label>
            <select
              id="size"
              value={filters.size}
              onChange={(e) => handleFilterChange("size", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.size.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Condition
            </label>
            <select
              id="condition"
              value={filters.condition}
              onChange={(e) => handleFilterChange("condition", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.condition.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price Range
            </label>
            <select
              id="priceRange"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.priceRange.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {filterOptions.sortBy.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
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
            onClick={() => {
              setFilters({
                category: "all",
                era: "all",
                size: "all",
                priceRange: "all",
                condition: "all",
                sortBy: "newest",
              });
              setSearchTerm("");
            }}
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
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative"
            >
              <div className="relative">
                {/* Position the favorite button */}
                <div className="absolute top-2 right-2 z-10">
                  <FavoriteButton itemId={item._id} />
                </div>

                <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-64 object-contain bg-gray-100 transition duration-300 group-hover:scale-105"
                  />
                </div>
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
    </div>
  );
};

export default Shop;
