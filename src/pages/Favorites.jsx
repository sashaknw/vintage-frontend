import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/favorites");
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again later.");
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeFavorite = async (itemId) => {
    try {
      await api.delete(`/api/favorites/${itemId}`);
      setFavorites(favorites.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const sortFavorites = (items) => {
    switch (sortBy) {
      case "priceLow":
        return [...items].sort((a, b) => a.price - b.price);
      case "priceHigh":
        return [...items].sort((a, b) => b.price - a.price);
      case "name":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "date":
      default:
        return [...items].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-black mb-8">
          My Favorites
        </h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-black mb-8">
          My Favorites
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Please log in to view your favorites
          </h2>
          <Link
            to="/login"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-black mb-8">
          My Favorites
        </h1>
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  const sortedFavorites = sortFavorites(favorites);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-black mb-8">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="mx-auto h-16 w-16 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <h2 className="mt-4 text-lg font-medium text-gray-900">
            No favorites yet
          </h2>
          <p className="mt-2 text-gray-600 mb-6">
            Start adding items to your favorites while you browse our
            collection.
          </p>
          <Link to="/shop">
            <a href="#_" className="relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">See Collection</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </a>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? "item" : "items"}
            </p>

            <div className="flex items-center">
              <select
                className="border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-gray-700 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="date">Sort by: Date Added</option>
                <option value="priceLow">Sort by: Price Low to High</option>
                <option value="priceHigh">Sort by: Price High to Low</option>
                <option value="name">Sort by: Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedFavorites.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/item/${item.id}`} className="block">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-amber-600 mb-1">
                          {item.era} • {item.size}
                        </p>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 font-medium text-amber-700">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                        {item.condition}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-4 pt-0 border-t border-gray-200 flex justify-between">
                  <Link
                    to={`/item/${item.id}`}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    Remove
                  </button>
                </div>

                <button
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm text-red-600 hover:text-amber-600"
                  aria-label={`Remove ${item.name} from favorites`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
