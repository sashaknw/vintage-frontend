import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // Mock cart data - in a real app, this would come from a cart context or state
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Vintage Denim Jacket",
      price: 65.0,
      size: "M",
      quantity: 1,
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "5",
      name: "Wool Sweater",
      price: 42.0,
      size: "L",
      quantity: 1,
      image: "https://via.placeholder.com/600x800",
    },
  ]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping cost (could be calculated based on location in a real app)
  const shipping = 8.95;

  // Calculate total
  const total = subtotal + shipping;

  // Update quantity for an item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from cart
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 border border-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link to={`/item/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                          </div>
                          <p className="text-lg font-medium text-amber-700">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="mx-2 w-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 px-6 py-4">
                <Link
                  to="/shop"
                  className="text-amber-700 hover:text-amber-900 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-medium text-amber-700">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-md font-medium transition"
              >
                Proceed to Checkout
              </button>
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Secure Checkout</p>
              </div>
            </div>
            <div className="mt-6 bg-amber-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-amber-800 mb-2">
                Customer Service
              </h3>
              <p className="text-sm text-amber-700">
                Have questions about your order? Contact our customer service
                team at
                <a
                  href="mailto:support@vintagevault.com"
                  className="font-medium"
                >
                  {" "}
                  support@vintagevault.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
