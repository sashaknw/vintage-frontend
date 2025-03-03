import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {


  // Mock cart data
  const cartItems = [
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
  ];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 8.95;
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + tax;

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const placeOrder = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-green-50 rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h2>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully. We've sent a confirmation
            email to {formData.email || "your email address"}.
          </p>
          <p className="text-gray-600 mb-6">
            Order number:{" "}
            <span className="font-medium">
              VV-{Math.floor(Math.random() * 100000)}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800"
            >
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">
        Checkout
      </h1>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex-1 flex items-center ${
              step >= 1 ? "text-amber-700" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-amber-100" : "bg-gray-200"
              }`}
            >
              <span className="text-sm font-medium">1</span>
            </div>
            <span className="ml-2 text-sm font-medium">Shipping</span>
          </div>
          <div
            className={`w-full h-1 mx-2 ${
              step >= 2 ? "bg-amber-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex-1 flex items-center ${
              step >= 2 ? "text-amber-700" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-amber-100" : "bg-gray-200"
              }`}
            >
              <span className="text-sm font-medium">2</span>
            </div>
            <span className="ml-2 text-sm font-medium">Payment</span>
          </div>
          <div
            className={`w-full h-1 mx-2 ${
              step >= 3 ? "bg-amber-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex-1 flex items-center ${
              step >= 3 ? "text-amber-700" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-amber-100" : "bg-gray-200"
              }`}
            >
              <span className="text-sm font-medium">3</span>
            </div>
            <span className="ml-2 text-sm font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="New York"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="NY"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-amber-700 text-white rounded-md font-medium hover:bg-amber-800 transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Payment Information
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="expiry"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-amber-700 text-white rounded-md font-medium hover:bg-amber-800 transition"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Review Your Order
                </h2>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Items
                  </h3>
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h4>{item.name}</h4>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Shipping Information
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium">{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                    <p className="mt-2">{formData.email}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 flex items-center">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                    <div className="ml-4">
                      <p className="text-gray-900">
                        Credit Card ****
                        {formData.cardNumber.slice(-4) || "1234"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Expires {formData.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-amber-700 text-white rounded-md font-medium ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-amber-800"
                    } transition`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>Shipping</p>
                <p>${shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>Tax</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="rounded-md bg-amber-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      All items are one-of-a-kind vintage pieces. Please check
                      measurements carefully before ordering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
