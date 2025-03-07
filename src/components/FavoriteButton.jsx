import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const FavoriteButton = ({ itemId, initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this item is already in favorites when component mounts
    const checkIfFavorite = async () => {
      if (!user) return;

      try {
        const response = await api.get("/api/favorites/check", {
          params: { itemId },
        });
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorite();
  }, [itemId, user]);

  const toggleFavorite = async (e) => {
    e.preventDefault(); // Prevent navigation if button is inside a Link
    e.stopPropagation(); // Prevent event bubbling

    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        await api.delete(`/api/favorites/${itemId}`);
      } else {
        // Add to favorites
        await api.post("/api/favorites", { itemId });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm ${
        isFavorite
          ? "text-red-600 hover:text-amber-600"
          : "text-gray-400 hover:text-red-600"
      } transition-colors duration-200 z-10`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`h-5 w-5 ${isLoading ? "animate-pulse" : ""}`}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isFavorite ? "0" : "2"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
