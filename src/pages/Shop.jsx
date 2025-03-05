import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

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
    condition: "all", // Added condition filter
    sortBy: "newest",
  });

  // Mock data - this would be fetched from your API in a real app
  const mockItems = [
    {
      id: "1",
      name: "Vintage Denim Jacket",
      price: 65.0,
      category: "outerwear",
      era: "90s",
      size: "M",
      condition: "Good",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "2",
      name: "Floral Print Dress",
      price: 48.5,
      category: "dresses",
      era: "70s",
      size: "S",
      condition: "Excellent",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "3",
      name: "Leather Crossbody Bag",
      price: 35.0,
      category: "accessories",
      era: "80s",
      size: "One Size",
      condition: "Good",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "4",
      name: "High-Waisted Jeans",
      price: 55.0,
      category: "bottoms",
      era: "70s",
      size: "M",
      condition: "Good",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "5",
      name: "Wool Sweater",
      price: 42.0,
      category: "tops",
      era: "90s",
      size: "L",
      condition: "Mint",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "6",
      name: "Pleated Midi Skirt",
      price: 38.0,
      category: "bottoms",
      era: "80s",
      size: "S",
      condition: "Good",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "7",
      name: "Leather Boots",
      price: 75.0,
      category: "shoes",
      era: "90s",
      size: "8",
      condition: "Good",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "8",
      name: "Silk Blouse",
      price: 45.0,
      category: "tops",
      era: "80s",
      size: "M",
      condition: "Mint",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "9",
      name: "Vintage Band T-Shirt",
      price: 28.0,
      category: "tops",
      era: "90s",
      size: "L",
      condition: "Rugged",
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "10",
      name: "Designer Sunglasses",
      price: 120.0,
      category: "accessories",
      era: "70s",
      size: "One Size",
      condition: "Mint",
      image: "https://via.placeholder.com/600x800",
    },
  ];

  useEffect(() => {
    // This would fetch data from your API in a real app
    const fetchItems = async () => {
      try {
        // Simulate API call
        setLoading(true);

        // Simulate filtering based on current filters
        let filteredItems = [...mockItems];

        // Apply category filter
        if (filters.category !== "all") {
          filteredItems = filteredItems.filter(
            (item) => item.category === filters.category
          );
        }

        // Apply era filter
        if (filters.era !== "all") {
          filteredItems = filteredItems.filter(
            (item) => item.era === filters.era
          );
        }

        // Apply size filter
        if (filters.size !== "all") {
          filteredItems = filteredItems.filter(
            (item) => item.size === filters.size
          );
        }

        // Apply condition filter
        if (filters.condition !== "all") {
          filteredItems = filteredItems.filter(
            (item) => item.condition === filters.condition
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
            default:
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
            // In a real app, you'd sort by date added
            // Here we're just using the default order of the mock data
            break;
          default:
            break;
        }

        // Simulate network delay
        setTimeout(() => {
          setItems(filteredItems);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load items");
        setLoading(false);
      }
    };

    fetchItems();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
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
    ],
    condition: [
      { value: "all", label: "All Conditions" },
      { value: "Mint", label: "Mint" },
      { value: "Good", label: "She's a beauty" },
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
      <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">
        Shop Vintage
      </h1>

      {/* Filters */}
      <div className="bg-amber-50 rounded-lg p-6 mb-8">
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

      {/* Results count and reset filters */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {loading ? "Loading items..." : `${items.length} items found`}
        </p>
        <button
          onClick={() =>
            setFilters({
              category: "all",
              era: "all",
              size: "all",
              priceRange: "all",
              condition: "all", // Added condition reset
              sortBy: "newest",
            })
          }
          className="text-sm text-amber-700 hover:text-amber-900 underline"
        >
          Reset Filters
        </button>
      </div>

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
                condition: "all", // Added condition reset
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
              key={item.id}
              to={`/item/${item.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                <img
                  src={item.image}
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
                      ${item.price.toFixed(2)}
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

      {/* Pagination - Simplified for this example */}
      {items.length > 0 && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-amber-50">
              Previous
            </button>
            <button className="px-3 py-2 rounded-md bg-amber-600 text-white font-medium">
              1
            </button>
            <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-amber-50">
              2
            </button>
            <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-amber-50">
              3
            </button>
            <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-amber-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Shop;
