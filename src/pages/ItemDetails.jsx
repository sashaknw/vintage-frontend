import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ItemDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Use the addToCart method from CartContext
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      // Use the addToCart method from CartContext
      addToCart(item, quantity);
      alert(`Added ${quantity} ${item.name} to cart`);
    }
  };

  const changeImage = (index) => {
    setCurrentImageIndex(index);
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
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={item.images[currentImageIndex]}
              alt={item.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Image thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {item.images.map((image, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  currentImageIndex === index ? "border-2 border-amber-500" : ""
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
          {/* ... existing navigation and details ... */}

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
