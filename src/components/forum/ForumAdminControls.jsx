import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ForumAdminControls = ({
  page = "community",
  categoryId = null,
  topicId = null,
  onDeleteTopic = null,
  onEditTopic = null,
}) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  // Different controls based on the current page
  switch (page) {
    case "community":
      return (
        <div className="flex gap-2 mt-4">
          <Link
            to="/community/new-category"
            className="bg-[#feff27] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Category
          </Link>
        </div>
      );

    case "category":
      return (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/community/category/${categoryId}/new`}
            className="bg-[#feff27] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Topic as Admin
          </Link>
          <button className="bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-800 transition-colors flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
            Pin Topics
          </button>
        </div>
      );

    case "topic":
      return (
        <div className="flex gap-2">
          {onEditTopic && (
            <button
              onClick={onEditTopic}
              className="bg-[#feff27] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Topic
            </button>
          )}
          {onDeleteTopic && (
            <button
              onClick={onDeleteTopic}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Topic
            </button>
          )}
          <button className="bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-800 transition-colors flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9 1a1 1 0 10-2 0v6a1 1 0 102 0V6zm-4 1a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
            Pin Topic
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Lock Topic
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default ForumAdminControls;
