// pages/TopicPage.jsx - Modern design with card layout and profile picture support
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";
import { formatDistanceToNow, formatDate } from "../helpers/dateUtils";
import ReplyForm from "../components/forum/ReplyForm";

// User avatar component that displays either a profile image or initials
const UserAvatar = ({ user, size = "medium" }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-16 h-16 text-lg",
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

const TopicPage = () => {
  const { topicId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Fetch topic data
  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true);
        const data = await forumService.getTopicWithReplies(topicId);
        setTopic(data.topic);
        setReplies(data.replies);

        // Check if user is following
        if (isAuthenticated && data.topic.followers) {
          // This is a placeholder - in a real app, you'd check against the user ID
          setFollowing(false);
        }
      } catch (err) {
        console.error("Error fetching topic:", err);
        setError("Failed to load topic");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId, isAuthenticated]);

  // Handle following a topic
  const handleFollow = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/community/topic/${topicId}` } });
      return;
    }

    try {
      const response = await forumService.followTopic(topicId);
      setFollowing(response.following);
    } catch (err) {
      console.error("Error following topic:", err);
    }
  };

  // Handle posting a reply
  const handleReply = async (content) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/community/topic/${topicId}` } });
      return;
    }

    try {
      const newReply = await forumService.createReply(topicId, content);
      setReplies([...replies, newReply]);

      // Update topic to reflect new activity
      setTopic({
        ...topic,
        lastActivity: new Date().toISOString(),
      });

      setShowReplyForm(false);
      return newReply;
    } catch (err) {
      console.error("Error posting reply:", err);
      throw err;
    }
  };

  // Handle liking a reply
  const handleLike = async (replyId) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/community/topic/${topicId}` } });
      return;
    }

    try {
      const response = await forumService.likeReply(replyId);

      // Update the replies state to reflect the new like status
      setReplies(
        replies.map((reply) => {
          if (reply._id === replyId) {
            // Create a new likes array based on the response
            const updatedLikes = response.liked
              ? [...(reply.likes || []), "currentUserId"] // Add current user ID
              : (reply.likes || []).filter((id) => id !== "currentUserId"); // Remove current user ID

            return {
              ...reply,
              likes: updatedLikes,
            };
          }
          return reply;
        })
      );
    } catch (err) {
      console.error("Error liking reply:", err);
    }
  };

  // This function was defined but never called in the component
  // Removing it to clean up the code

  // Removed the unused getCategoryTheme function and theme variable

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
        <div className="py-8 text-center">
          <p className="text-red-600">{error || "Topic not found"}</p>
          <Link
            to="/community"
            className="text-black hover:underline mt-4 inline-block"
          >
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/community"
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            Community
          </Link>
          <Link
            to={`/community/category/${topic.category._id}`}
            className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white"
          >
            {topic.category.name}
          </Link>
          <div className="bg-black text-white px-3 py-1.5 text-sm font-medium rounded-full">
            Topic
          </div>
        </div>
      </div>

      {/* Topic Card */}
      <div className="mb-6 bg-white rounded-3xl border border-gray-200 overflow-hidden">
        {/* Topic Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{topic.title}</h1>

            <div className="flex items-center gap-2">
              {topic.isPinned && (
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  Pinned
                </span>
              )}
              {topic.isLocked && (
                <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Locked
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <UserAvatar user={topic.author} />
              <div>
                <div className="font-medium">
                  {topic.author?.name || "Unknown"}
                </div>
                <div className="text-xs text-gray-500">
                  Posted {formatDate(new Date(topic.createdAt))}
                </div>
              </div>
            </div>

            <button
              onClick={handleFollow}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                following
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              disabled={!isAuthenticated}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Topic Content */}
        <div className="p-6">
          <div className="prose max-w-none mb-6">
            {topic.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </div>

            {!topic.isLocked && (
              <button
                onClick={() => setShowReplyForm(true)}
                className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
                disabled={!isAuthenticated}
              >
                Reply to Topic
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Post a Reply</h3>
          <ReplyForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Replies</h2>

        {replies.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 text-center">
            <p className="text-gray-500">
              No replies yet. Be the first to reply!
            </p>

            {!showReplyForm && !topic.isLocked && (
              <button
                onClick={() => setShowReplyForm(true)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
                disabled={!isAuthenticated}
              >
                Post a Reply
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => {
              const hasLiked =
                isAuthenticated &&
                reply.likes &&
                Array.isArray(reply.likes) &&
                reply.likes.includes("currentUserId");

              return (
                <div
                  key={reply._id}
                  className="bg-white rounded-3xl border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <UserAvatar user={reply.author} />
                      <div>
                        <div className="font-medium">
                          {reply.author?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(reply.createdAt))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-14">
                    <div className="prose max-w-none mb-4">
                      {reply.content.split("\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <button
                      onClick={() => handleLike(reply._id)}
                      disabled={!isAuthenticated}
                      className={`flex items-center gap-1 text-sm ${
                        hasLiked
                          ? "text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${
                          hasLiked ? "fill-black" : "fill-gray-500"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {reply.likes?.length || 0}{" "}
                      {reply.likes?.length === 1 ? "Like" : "Likes"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply Button at Bottom */}
        {!showReplyForm && !topic.isLocked && replies.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowReplyForm(true)}
              className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
              disabled={!isAuthenticated}
            >
              Post a Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
