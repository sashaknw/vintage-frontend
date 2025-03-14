import React from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "../../helpers/dateUtils";

const ReplyList = ({ replies, onLike }) => {
  const { user, isAuthenticated } = useAuth();

  if (!replies || replies.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No replies yet. Be the first to reply!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-amber-900">
          Replies ({replies.length})
        </h2>
      </div>

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
                  <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                    {reply.author?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h3 className="font-medium text-black">
                      {reply.author?.name || "Unknown"}
                    </h3>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatDistanceToNow(
                        new Date(reply.createdAt || Date.now())
                      )}
                    </span>
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
    </div>
  );
};

export default ReplyList;
