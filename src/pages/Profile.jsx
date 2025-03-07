
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "2025-02-18",
      total: 115.5,
      status: "delivered",
      items: [
        { id: "1", name: "Vintage Denim Jacket", price: 65.0, quantity: 1 },
        { id: "5", name: "Wool Sweater", price: 42.0, quantity: 1 },
      ],
    },
    {
      id: "ORD-12346",
      date: "2025-01-28",
      total: 48.5,
      status: "processing",
      items: [
        { id: "2", name: "Floral Print Dress", price: 48.5, quantity: 1 },
      ],
    },
  ]);

  // Load user data into form when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage({ type: "", text: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setMessage({ type: "success", text: "Profile updated successfully" });
      setIsEditing(false);

      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    }
  };

  // Handle order cancellation
  const cancelOrder = (orderId) => {
    // In a real app, you would call your API here
    // For now, just update the local state
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center bg-white shadow-sm rounded-lg p-12 border border-gray-100">
          <svg
            className="mx-auto h-16 w-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h1 className="mt-4 text-2xl font-medium text-gray-900 mb-2">
            Account Access Required
          </h1>
          <p className="text-gray-500 mb-8">
            Please log in to view your profile and manage your orders.
          </p>
          <Link
            to="/login"
            className="inline-block bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-black mb-8">
        My Account
      </h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        {/* Profile Navigation Tabs */}
        <div className="border-b border-gray-100">
          <nav className="flex -mb-px">
            <button
              onClick={() => handleTabChange("account")}
              className={`py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === "account"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => handleTabChange("orders")}
              className={`py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => handleTabChange("addresses")}
              className={`py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === "addresses"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Addresses
            </button>
          </nav>
        </div>

        {/* Account Settings Tab */}
        {activeTab === "account" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-black">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Success/Error Message */}
            {message.text && (
              <div
                className={`p-4 mb-6 rounded-md ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username field */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-black mb-4">
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current password field */}
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Required to change password
                      </p>
                    </div>

                    {/* New password field */}
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    {/* Confirm password field */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setMessage({ type: "", text: "" });
                      // Reset form to current user data
                      if (user) {
                        setFormData({
                          username: user.username || "",
                          email: user.email || "",
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Username
                  </h3>
                  <p className="text-black font-medium">{user.username || user.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </h3>
                  <p className="text-black font-medium">{user.email}</p>
                </div>
              </div>
            )}

            <div className="mt-12 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium text-black mb-4">
                Account Actions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-black font-medium transition-colors"
                    >
                      Sign Out
                    </button>
                    <p className="text-sm text-gray-500 mt-1">
                      Log out of your account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="p-6">
            <h2 className="text-xl font-medium text-black mb-6">
              Order History
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <h3 className="mt-2 text-black font-medium">
                  No orders yet
                </h3>
                <p className="mt-1 text-gray-500">
                  Start browsing our collection to find unique vintage items.
                </p>
                <div className="mt-6">
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-black">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : order.status === "processing"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : order.status === "cancelled"
                              ? "bg-gray-100 text-gray-600 border border-gray-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <Link
                          to={`/orders/${order.id}`}
                          className="ml-4 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flow-root">
                        <ul className="-my-4 divide-y divide-gray-100">
                          {order.items.map((item) => (
                            <li key={item.id} className="py-4 flex">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={`https://via.placeholder.com/64x64?text=${item.id}`}
                                  alt={item.name}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between">
                                    <h4 className="text-sm font-medium text-black">
                                      <Link 
                                        to={`/item/${item.id}`}
                                        className="hover:text-amber-700 transition-colors"
                                      >
                                        {item.name}
                                      </Link>
                                    </h4>
                                    <p className="ml-4 text-sm font-medium text-black">
                                      €{item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

<div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        {order.items.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}{" "}
                        items
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-medium text-black mr-4">
                          Total: €{order.total.toFixed(2)}
                        </p>
                        {order.status === "processing" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="text-sm text-gray-600 hover:text-black border border-gray-200 px-3 py-1 rounded-md transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-black">
                Saved Addresses
              </h2>
              <button className="text-amber-700 hover:text-amber-900 font-medium transition-colors">
                Add New Address
              </button>
            </div>

            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <h3 className="mt-2 text-black font-medium">
                No addresses saved
              </h3>
              <p className="mt-1 text-gray-500">
                Add a shipping address to your account.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 rounded-md text-white bg-black hover:bg-gray-900 transition-colors">
                  Add Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;