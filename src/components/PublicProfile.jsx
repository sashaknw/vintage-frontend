import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";

// User avatar component
const UserAvatar = ({ user, size = "medium" }) => {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-24 h-24 text-xl",
  };

  const classes = `${sizeClasses[size]} rounded-full flex items-center justify-center font-bold`;

  if (!user) {
    return <div className={`${classes} bg-gray-200 text-gray-600`}>?</div>;
  }

  if (user.profilePicture) {
    return (
      <img
        src={user.profilePicture}
        alt={user.name || "User"}
        className={`${classes} object-cover border border-gray-200`}
      />
    );
  }

  return (
    <div className={`${classes} bg-gray-200 text-gray-700`}>
      {(user.name || user.username || "?").charAt(0).toUpperCase()}
    </div>
  );
};

const PublicProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  // State for user's forum posts
  const [posts, setPosts] = useState([]);

  // State for user's favorite items
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Fetch the public profile data
        const userData = await authService.getPublicProfile(userId);
        setProfileUser(userData);

        // Fetch posts separately
        if (userData) {
          // These would be separate API calls in a real implementation
          // For now we're mocking the data
          setPosts([
            {
              id: "post1",
              title: "Vintage Fashion in the Modern Era",
              excerpt:
                "How vintage styles continue to influence today's fashion trends...",
              date: "2025-02-20",
              likes: 15,
              comments: 6,
            },
            {
              id: "post2",
              title: "My Favorite Thrift Finds",
              excerpt:
                "I visited several thrift stores last weekend and discovered some amazing pieces...",
              date: "2025-01-30",
              likes: 28,
              comments: 12,
            },
          ]);

          setFavorites([
            {
              id: "item1",
              name: "Vintage Denim Jacket",
              price: 65.0,
              image: "https://via.placeholder.com/200x300",
            },
            {
              id: "item2",
              name: "Leather Boots",
              price: 85.0,
              image: "https://via.placeholder.com/200x300",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Check if this is the current user's own profile
  const isOwnProfile = currentUser && currentUser.id === userId;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            {error || "User not found"}
          </h2>
          <p className="text-gray-500 mb-6">
            The profile you're looking for could not be found.
          </p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <UserAvatar user={profileUser} size="large" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {profileUser.username || profileUser.name}
              </h1>

              {profileUser.bio && (
                <p className="text-gray-500 mb-4">{profileUser.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {isOwnProfile ? (
                  <Link
                    to="/account"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Manage Your Account
                  </Link>
                ) : (
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="border-t border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "posts"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Forum Posts
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "favorites"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Favorites
            </button>
          </nav>
        </div>
      </div>

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">Forum Posts</h2>

            {isOwnProfile && (
              <Link
                to="/community"
                className="text-sm font-medium text-amber-700 hover:text-amber-900"
              >
                Create New Post
              </Link>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                {isOwnProfile
                  ? "You haven't created any posts yet."
                  : "This user hasn't created any posts yet."}
              </p>

              {isOwnProfile && (
                <Link
                  to="/community"
                  className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Join the Community
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    <Link
                      to={`/community/topic/${post.id}`}
                      className="hover:text-amber-700"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 mb-3">{post.excerpt}</p>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === "favorites" && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              Favorite Items
            </h2>

            {isOwnProfile && (
              <Link
                to="/shop"
                className="text-sm font-medium text-amber-700 hover:text-amber-900"
              >
                Browse Shop
              </Link>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                {isOwnProfile
                  ? "You haven't added any favorites yet."
                  : "This user hasn't added any favorites yet."}
              </p>

              {isOwnProfile && (
                <Link
                  to="/shop"
                  className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Explore Products
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <Link to={`/item/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      <Link
                        to={`/item/${item.id}`}
                        className="hover:text-amber-700"
                      >
                        {item.name}
                      </Link>
                    </h3>

                    <p className="text-amber-700 font-medium">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
