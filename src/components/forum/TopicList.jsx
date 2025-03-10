// components/forum/TopicList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const TopicList = ({ topics, categoryId, categoryName }) => {
  if (!topics || topics.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500 mb-4">No topics yet in this category.</p>
        <Link
          to={`/community/category/${categoryId}/new`}
          className="text-black hover:text-amber-900 font-medium"
        >
          Be the first to start a topic
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-black">{categoryName}</h2>
          <Link to={`/community/category/${categoryId}/new`}>
            <a href="#_" className="relative inline-block text-lg group w-full">
              <span className="relative z-10 block px-5 py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-4 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">New Topic</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </a>
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className={`p-4 hover:bg-amber-50 transition-colors ${
              topic.isPinned ? "bg-amber-50" : ""
            }`}
          >
            <div className="flex items-start">
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  {topic.isPinned && (
                    <span className="bg-amber-200 text-black text-xs px-2 py-0.5 rounded-full">
                      Pinned
                    </span>
                  )}
                  <Link
                    to={`/community/topic/${topic._id}`}
                    className="font-medium text-black hover:text-amber-700"
                  >
                    {topic.title}
                  </Link>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span>Posted by {topic.author?.name || "Unknown"} • </span>
                  <span>
                    {formatDistanceToNow(new Date(topic.lastActivity), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="text-center min-w-[60px]">
                <div className="text-lg font-medium text-black">
                  {topic.replyCount}
                </div>
                <div className="text-xs text-gray-500">replies</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicList;
