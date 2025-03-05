import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
//import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // This will be replaced with your actual API endpoint
        // const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        // setItem(response.data);

        // Using dummy data for now
        setItem({
          id: id,
          name: "Vintage Denim Jacket",
          description:
            "Classic 90s denim jacket with subtle distressing and brass buttons. Perfect for layering in any season.",
          price: 65.0,
          size: "L",
          category: "Outerwear",
          condition: "Good",
          brand: "Levi's",
          era: "90s",
          images: ["/outerwear/denim-jacket-view1.webp", "/outerwear/denim-jacket-view2.webp"],
          inStock: true,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load item details");
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const addToCart = () => {
    // This will be implemented with your cart context/state
    console.log(`Added ${quantity} of item ${id} to cart`);
    // Show confirmation message to user
    alert(`Added ${quantity} item(s) to your cart!`);
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
        {/* Item Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-auto object-cover"
          />
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
                <span className="text-gray-500">Brand:</span> {item.brand}
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

          <p className="text-gray-700 mb-6">{item.description}</p>

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
            onClick={addToCart}
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
