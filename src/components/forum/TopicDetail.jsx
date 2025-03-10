// components/forum/TopicDetail.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { formatDistanceToNow } from "../../helpers/dateUtils";

const TopicDetail = ({
  topic,
  replies,
  onFollow,
  onReply,
  onLike,
  following = false,
}) => {
  // Remove the unused user variable, only keep isAuthenticated
  const { isAuthenticated } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    if (isAuthenticated) {
      setShowReplyForm(true);
    } else {
      // If not authenticated, you might want to redirect to login
      // or show a modal explaining they need to log in
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Topic Header */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-medium text-black">{topic.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Posted by {topic.author?.name || "Unknown"}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(topic.createdAt))}</span>
            <span>•</span>
            <span>In {topic.category?.name}</span>
            {topic.isPinned && (
              <>
                <span>•</span>
                <span className="bg-amber-200 text-black text-xs px-2 py-0.5 rounded-full">
                  Pinned
                </span>
              </>
            )}
            {topic.isLocked && (
              <>
                <span>•</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                  Locked
                </span>
              </>
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

        {/* Topic Content */}
        <div className="p-6">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: topic.content.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>

      {/* Reply Form */}
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
      <ReplyList replies={replies} onLike={onLike} />

      {/* Reply Button at Bottom */}
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
