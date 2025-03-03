import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "2025-02-15",
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
  ];

  // Mock favorites data
  const favorites = [
    {
      id: "3",
      name: "Leather Crossbody Bag",
      price: 35.0,
      image: "https://via.placeholder.com/600x800",
    },
    {
      id: "7",
      name: "Leather Boots",
      price: 75.0,
      image: "https://via.placeholder.com/600x800",
    },
  ];

  useEffect(() => {
    if (user) {
      setProfileData({
        ...profileData,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    // Validate password fields if we're changing password
    if (
      profileData.newPassword ||
      profileData.confirmPassword ||
      profileData.currentPassword
    ) {
      if (!profileData.currentPassword) {
        setFormError("Current password is required to set a new password");
        return;
      }

      if (profileData.newPassword !== profileData.confirmPassword) {
        setFormError("New passwords do not match");
        return;
      }

      if (profileData.newPassword.length < 8) {
        setFormError("New password must be at least 8 characters long");
        return;
      }
    }

    try {
      setIsSubmitting(true);

      // In a real app, you'd send only the changed fields
      const updatedData = {
        username: profileData.username,
        email: profileData.email,
      };

      if (profileData.newPassword) {
        updatedData.currentPassword = profileData.currentPassword;
        updatedData.newPassword = profileData.newPassword;
      }

      await updateProfile(updatedData);
      setFormSuccess("Profile updated successfully");
      setIsEditing(false);

      // Reset password fields
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">
        My Account
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "profile"
                  ? "border-b-2 border-amber-600 text-amber-700"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "orders"
                  ? "border-b-2 border-amber-600 text-amber-700"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "favorites"
                  ? "border-b-2 border-amber-600 text-amber-700"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Favorites
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-amber-700 hover:text-amber-900 font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                  {formSuccess}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={profileData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={profileData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        minLength="8"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={profileData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormError("");
                        setFormSuccess("");

                        // Reset form data to current user data
                        if (user) {
                          setProfileData({
                            username: user.username,
                            email: user.email,
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 bg-amber-700 text-white rounded-md ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-amber-800"
                      }`}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Username
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {user?.username}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Your Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    to="/shop"
                    className="text-amber-700 hover:text-amber-900 font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Placed on{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          <Link
                            to={`/orders/${order.id}`}
                            className="ml-4 text-sm text-amber-700 hover:text-amber-900 font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flow-root">
                          <ul className="-my-4 divide-y divide-gray-200">
                            {order.items.map((item) => (
                              <li key={item.id} className="py-4 flex">
                                <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={`https://via.placeholder.com/64x64?text=${item.id}`}
                                    alt={item.name}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between">
                                      <h4 className="text-sm font-medium text-gray-900">
                                        <Link to={`/item/${item.id}`}>
                                          {item.name}
                                        </Link>
                                      </h4>
                                      <p className="ml-4 text-sm font-medium text-gray-900">
                                        ${item.price.toFixed(2)}
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

                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                          items
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                          Total: ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Your Favorites
              </h2>

              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't added any items to your favorites yet.
                  </p>
                  <Link
                    to="/shop"
                    className="text-amber-700 hover:text-amber-900 font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-lg shadow overflow-hidden"
                    >
                      <Link to={`/item/${item.id}`} className="block">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-64 object-cover object-center group-hover:opacity-75"
                        />
                      </Link>
                      <button
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm text-amber-600 hover:text-amber-800"
                        aria-label="Remove from favorites"
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
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={`/item/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm font-medium text-amber-700">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="mt-3">
                          <Link
                            to={`/item/${item.id}`}
                            className="text-sm text-amber-700 hover:text-amber-900 font-medium"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
