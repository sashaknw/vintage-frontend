import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

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
    <div className={`${classes} bg-[#feff26] text-black`}>
      {(user.name || user.username || "?").charAt(0).toUpperCase()}
    </div>
  );
};

const PublicProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const [userTopics, setUserTopics] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/users/${userId}/public`);
        setProfileUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (!profileUser) return;

    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);
        const response = await api.get(`/api/forum/user/${userId}/topics`);
        setUserTopics(response.data);
      } catch (err) {
        console.error("Error fetching user topics:", err);
        setUserTopics([]);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [profileUser, userId]);

  useEffect(() => {
    if (!profileUser || activeTab !== "favorites") return;

    const fetchFavorites = async () => {
      try {
        setLoadingFavorites(true);

        const endpoint = isOwnProfile
          ? `/api/favorites`
          : `/api/favorites/user/${userId}`;

        const response = await api.get(endpoint);
        setUserFavorites(response.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setUserFavorites([]);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavorites();
  }, [profileUser, userId, activeTab]);

  const isOwnProfile = currentUser && currentUser._id === userId;

  if (loading) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex justify-center py-12">
            <p className="text-gray-300">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              {error || "User not found"}
            </h2>
            <p className="text-gray-500 mb-6">
              The profile you're looking for could not be found.
            </p>
            <Link
              to="/community"
              className="inline-block px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
              Back to Community
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <UserAvatar user={profileUser} size="large" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {profileUser.name}
                </h1>

                {profileUser.bio && (
                  <p className="text-gray-500 mb-4">{profileUser.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {isOwnProfile ? (
                    <Link
                      to="/account"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Manage Your Account
                    </Link>
                  ) : (
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

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

        {activeTab === "posts" && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">Forum Posts</h2>

              {isOwnProfile && (
                <Link
                  to="/community"
                  className="text-sm font-medium text-black hover:text-gray-700"
                >
                  Create New Post
                </Link>
              )}
            </div>

            {loadingTopics ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Loading posts...</p>
              </div>
            ) : userTopics.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">
                  {isOwnProfile
                    ? "You haven't created any posts yet."
                    : "This user hasn't created any posts yet."}
                </p>

                {isOwnProfile && (
                  <Link
                    to="/community"
                    className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                  >
                    Join the Community
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {userTopics.map((topic) => (
                  <div
                    key={topic._id}
                    className="border border-gray-200 hover:border-l-4 hover:border-l-[#feff26] rounded-lg p-4 transition-all"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      <Link
                        to={`/community/topic/${topic._id}`}
                        className="hover:underline"
                      >
                        {topic.title}
                      </Link>
                    </h3>

                    <p className="text-gray-500 mb-3">
                      {topic.content?.substring(0, 150)}
                      {topic.content?.length > 150 ? "..." : ""}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {new Date(topic.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-4">
                        <span>{topic.replyCount || 0} replies</span>
                        {topic.isAdminPost && (
                          <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                        {topic.isPinned && (
                          <span className="bg-[#feff26] text-black text-xs px-2 py-0.5 rounded-full">
                            Pinned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                {isOwnProfile
                  ? "My Favorites"
                  : `${profileUser.name}'s Favorites`}
              </h2>

              {isOwnProfile && (
                <Link
                  to="/shop"
                  className="text-sm font-medium text-black hover:text-gray-700"
                >
                  Browse Shop
                </Link>
              )}
            </div>

            {loadingFavorites ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Loading favorites...</p>
              </div>
            ) : userFavorites.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">
                  {isOwnProfile
                    ? "You haven't added any favorites yet."
                    : `${profileUser.name} hasn't added any favorites yet.`}
                </p>

                {isOwnProfile && (
                  <Link
                    to="/shop"
                    className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                  >
                    Explore Products
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFavorites.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#feff26] transition-all group"
                  >
                    <div className="relative pt-[100%]">
                      <Link
                        to={`/item/${item.id}`}
                        className="block absolute inset-0"
                      >
                        <img
                          src={item.image || (item.images && item.images[0])}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-contain p-2 bg-gray-50 group-hover:opacity-95 transition-opacity"
                        />
                      </Link>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">
                        <Link
                          to={`/item/${item.id}`}
                          className="hover:text-[#feff26]"
                        >
                          {item.name}
                        </Link>
                      </h3>

                      <p className="text-black font-medium">
                        €{item.price?.toFixed(2)}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                        {item.size && <span>{item.size}</span>}
                        {item.era && <span>• {item.era}</span>}
                        {item.condition && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.condition}
                          </span>
                        )}
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
  );
};

export default PublicProfile;
