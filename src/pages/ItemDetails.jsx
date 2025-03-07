import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import FavoriteButton from "../components/FavoriteButton";

const ItemDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveringImage, setHoveringImage] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/items/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError("Failed to load item details");
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
      alert(`Added ${quantity} ${item.name} to cart`);
    }
  };

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPreviousImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      // Wrap to the last image
      setCurrentImageIndex(item.images.length - 1);
    }
  };

  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex < item.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Wrap to the first image
      setCurrentImageIndex(0);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-red-600 mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <Link
          to="/shop"
          className="text-amber-700 hover:text-amber-900 underline"
        >
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Item Images */}
        <div>
          <div
            className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative"
            onMouseEnter={() => setHoveringImage(true)}
            onMouseLeave={() => setHoveringImage(false)}
          >
            {/* Favorite button */}
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton itemId={item._id} />
            </div>

            {/* Previous image arrow */}
            <button
              onClick={goToPreviousImage}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-60 flex items-center justify-center z-10 transition-opacity duration-300 ${
                hoveringImage ? "opacity-70" : "opacity-0"
              } hover:opacity-100 focus:outline-none`}
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next image arrow */}
            <button
              onClick={goToNextImage}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-60 flex items-center justify-center z-10 transition-opacity duration-300 ${
                hoveringImage ? "opacity-70" : "opacity-0"
              } hover:opacity-100 focus:outline-none`}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Current image */}
            <img
              src={item.images[currentImageIndex]}
              alt={item.name}
              className="w-full h-[500px] object-cover"
            />

            {/* Image counter indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs rounded-full px-2 py-1">
              {currentImageIndex + 1} / {item.images.length}
            </div>
          </div>

          {/* Image thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {item.images.map((image, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  currentImageIndex === index
                    ? "border-2 border-amber-500"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${item.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div>
          <nav className="flex mb-4 text-sm">
            <Link to="/" className="text-amber-600 hover:text-amber-800">
              Home
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/shop" className="text-amber-600 hover:text-amber-800">
              Shop
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500">{item.name}</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
          <p className="text-2xl text-amber-700 mb-4">
            €{item.price.toFixed(2)}
          </p>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Brand:</span>{" "}
                {item.brand || "N/A"}
              </div>
              <div>
                <span className="text-gray-500">Size:</span> {item.size}
              </div>
              <div>
                <span className="text-gray-500">Condition:</span>{" "}
                {item.condition}
              </div>
              <div>
                <span className="text-gray-500">Era:</span> {item.era}
              </div>
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Item Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Additional Details (Optional) */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Vintage Details
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Era: {item.era} Vintage</li>
              <li>Condition: {item.condition} Condition</li>
              <li>Unique Vintage Piece</li>
              <li>One of a Kind Garment</li>
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-gray-700">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {[...Array(5).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!item.inStock}
            className={`w-full py-3 px-6 rounded-md text-white font-medium ${
              item.inStock
                ? "bg-amber-700 hover:bg-amber-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {item.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
