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
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f0ff26]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
          <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Please log in to view your favorites
            </h2>
            <Link
              to="/login"
              className="bg-black text-white border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
          <div className="bg-red-600 text-white p-6 rounded-3xl">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const sortedFavorites = sortFavorites(favorites);

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-black mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-600 p-8 text-center">
            <svg
              className="mx-auto h-16 w-16 text-[#f0ff26]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h2 className="mt-4 text-xl font-medium text-gray-900">
              No favorites yet
            </h2>
            <p className="mt-2 text-gray-600 mb-6">
              Start adding items to your favorites while you browse our
              collection.
            </p>
            <Link
              to="/shop"
              className="bg-black text-white border border-black px-6 py-3 rounded-full font-medium hover:bg-[#f0ff26] hover:text-black transition-colors inline-block"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-white">
                {favorites.length} {favorites.length === 1 ? "item" : "items"}
              </p>

              <div className="flex items-center">
                <select
                  className="border border-gray-200 rounded-full px-4 py-2 bg-black text-white hover:border-[#f0ff26] focus:outline-none focus:ring-2 focus:ring-[#f0ff26]"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedFavorites.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden relative"
                >
                  <Link to={`/item/${item.id}`} className="block">
                    <div className="w-full h-[300px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            {item.era} • {item.size}
                          </p>
                          <h3 className="text-lg font-medium text-black line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="mt-1 font-medium text-black">
                            €{item.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="bg-[#f0ff26] text-black text-xs px-3 py-1 rounded-full">
                          {item.condition}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 pt-0 border-t border-gray-100 flex justify-between items-center">
                    <Link
                      to={`/item/${item.id}`}
                      className="text-black border border-black px-6 py-2 rounded-3xl hover:text-white hover:bg-black text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="text-sm text-red-600 hover:text-black transition-colors"
                      aria-label={`Remove ${item.name} from favorites`}
                    >
                      Remove
                    </button>
                  </div>

                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm text-red-600 hover:text-black transition-colors"
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
    </div>
  );
};

export default Favorites;
