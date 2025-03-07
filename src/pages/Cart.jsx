import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 8.95;
  const total = subtotal + shipping;

  // Navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-500 mb-8">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-black mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="p-6 transition-colors hover:bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 border border-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link
                              to={`/items/${item._id}`}
                              className="hover:text-amber-700 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-black">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-2 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              className="h-4 w-4"
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
                              updateQuantity(item._id, parseInt(e.target.value))
                            }
                            className="w-10 text-center border-x border-gray-200 py-1 text-gray-900 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.min(10, item.quantity + 1)
                              )
                            }
                            className="p-2 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              className="h-4 w-4"
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
                          onClick={() => removeFromCart(item._id)}
                          className="text-sm text-gray-500 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 px-6 py-4">
              <Link
                to="/shop"
                className="text-amber-700 hover:text-amber-900 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-8">
            <h2 className="text-lg font-medium text-black mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p className="text-black font-medium">€{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Shipping</p>
                <p className="text-black font-medium">€{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <p className="text-black text-lg font-medium">Total</p>
                <p className="text-lg font-medium text-black">
                  €{total.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-black hover:bg-gray-900 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
            <div className="mt-6 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="ml-2 text-sm text-gray-500">
                Secure Checkout
              </span>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-sm font-medium text-black mb-2">
              Customer Service
            </h3>
            <p className="text-sm text-gray-600">
              Have questions about your order? Contact our customer service team
              at{" "}
              <a
                href="mailto:support@vintagevault.com"
                className="font-medium text-amber-700 hover:text-amber-900 transition-colors"
              >
                support@vintagevault.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
