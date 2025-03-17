import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ReplyForm from "./ReplyForm";
import { formatDistanceToNow } from "../../helpers/dateUtils";

const UserAvatar = ({ user, size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6 text-xs",
    medium: "w-8 h-8 text-sm",
    large: "w-12 h-12 text-base",
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

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h3 className="text-lg font-medium mb-3">Confirm Action</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const TopicDetail = ({
  topic,
  replies,
  onFollow,
  onReply,
  onLike,
  onDeleteReply,
  following = false,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    message: "",
    replyId: null,
  });

  const handleReplyClick = () => {
    if (isAuthenticated) {
      setShowReplyForm(true);
    } else {
      alert("Please log in to reply");
    }
  };

  const handleFollowClick = () => {
    if (isAuthenticated) {
      onFollow(topic._id);
    } else {
      alert("Please log in to follow this topic");
    }
  };

  const handleReplySubmit = async (content) => {
    try {
      await onReply(topic._id, content);
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleDeleteReply = (replyId) => {
    setConfirmDialog({
      isOpen: true,
      message:
        "Are you sure you want to delete this reply? This action cannot be undone.",
      replyId,
    });
  };

  const confirmDeleteReply = () => {
    onDeleteReply(confirmDialog.replyId);
    setConfirmDialog({
      isOpen: false,
      message: "",
      replyId: null,
    });
  };

  const cancelDeleteReply = () => {
    setConfirmDialog({
      isOpen: false,
      message: "",
      replyId: null,
    });
  };

  const canDeleteReply = (replyAuthor) => {
    if (!user || !isAuthenticated) return false;
    return user._id === replyAuthor?._id || user.isAdmin;
  };

  return (
    <div className="space-y-6">
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        message={confirmDialog.message}
        onConfirm={confirmDeleteReply}
        onCancel={cancelDeleteReply}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-medium text-black">{topic.title}</h1>
          <div className="mt-3 flex items-center">
            <UserAvatar user={topic.author} size="medium" />
            <div className="ml-3">
              {topic.author ? (
                <Link
                  to={`/profile/${topic.author._id}`}
                  className="font-medium text-gray-900 hover:underline "
                >
                  {topic.author.name || "Unknown"}
                </Link>
              ) : (
                <span className="font-medium text-gray-900">Unknown</span>
              )}
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(topic.createdAt))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>In {topic.category?.name}</span>
            {topic.isPinned && (
              <span className="bg-amber-200 text-black text-xs px-2 py-0.5 rounded-full">
                Pinned
              </span>
            )}
            {topic.isLocked && (
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                Locked
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleFollowClick}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm ${
                following
                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              disabled={!isAuthenticated}
            >
              {following ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
              )}
              {following ? "Following" : "Follow"}
            </button>
            {!topic.isLocked && (
              <button
                onClick={handleReplyClick}
                className="bg-amber-700 text-white px-3 py-1.5 rounded text-sm hover:bg-amber-800 flex items-center gap-1"
                disabled={!isAuthenticated}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Reply
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: topic.content.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>

      {showReplyForm && (
        <div className="bg-white rounded-lg shadow overflow-hidden p-4">
          <h3 className="text-lg font-medium text-amber-900 mb-4">
            Post a Reply
          </h3>
          <ReplyForm
            onSubmit={handleReplySubmit}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-amber-900">
            Replies ({replies.length})
          </h2>
        </div>

        {replies.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">
              No replies yet. Be the first to reply!
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {replies.map((reply) => {
              const hasLiked =
                isAuthenticated &&
                reply.likes &&
                Array.isArray(reply.likes) &&
                user &&
                reply.likes.some((id) => id === user._id);

              return (
                <div key={reply._id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <UserAvatar user={reply.author} size="medium" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-black">
                            {reply.author?.name || "Unknown"}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {formatDistanceToNow(
                              new Date(reply.createdAt || Date.now())
                            )}
                          </span>
                        </div>
                        {canDeleteReply(reply.author) && (
                          <button
                            onClick={() => handleDeleteReply(reply._id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Delete reply"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="w-5 h-5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="mt-2 text-gray-700 whitespace-pre-line">
                        {reply.content}
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            isAuthenticated && onLike && onLike(reply._id)
                          }
                          disabled={!isAuthenticated}
                          className={`flex items-center gap-1 text-sm ${
                            hasLiked
                              ? "text-amber-700"
                              : "text-gray-500 hover:text-amber-700"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              hasLiked ? "fill-amber-700" : "fill-gray-500"
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
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!showReplyForm && !topic.isLocked && (
        <div className="text-center">
          <button
            onClick={handleReplyClick}
            className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800"
            disabled={!isAuthenticated}
          >
            Post a Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicDetail;
