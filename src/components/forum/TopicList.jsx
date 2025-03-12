// components/forum/TopicList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const TopicList = ({ topics, categoryId, categoryName }) => {
  if (!topics || topics.length === 0) {
    return (
      <div className="text-center py-8 bg-black rounded-3xl border-2 border-white p-6">
        <p className="text-white mb-4">No topics yet in this category.</p>
        <Link
          to={`/community/category/${categoryId}/new`}
          className="inline-block px-4 py-2 bg-[#feff27] text-black rounded-full font-medium hover:bg-yellow-300 transition-colors"
        >
          Be the first to start a topic
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-3xl border-2 border-white overflow-hidden">
      <div className="p-6 border-b border-white/20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-white">{categoryName}</h2>
          <Link to={`/community/category/${categoryId}/new`}>
            <button className="px-4 py-2 bg-[#feff27] text-black rounded-full font-medium hover:bg-yellow-300 transition-colors">
              New Topic
            </button>
          </Link>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className={`p-6 hover:bg-white/5 transition-colors ${
              topic.isPinned ? "bg-white/10" : ""
            }`}
          >
            <div className="flex items-start">
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  {topic.isPinned && (
                    <span className="bg-[#feff27] text-black text-xs px-2 py-0.5 rounded-full">
                      Pinned
                    </span>
                  )}
                  <Link
                    to={`/community/topic/${topic._id}`}
                    className="font-medium text-white   hover:text-[#feff27] transition-colors"
                  >
                    {topic.title}
                  </Link>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  <span>Posted by {topic.author?.name || "Unknown"} • </span>
                  <span>
                    {formatDistanceToNow(new Date(topic.lastActivity), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="text-center min-w-[60px] bg-white/10 rounded-full px-3 py-1">
                <div className="text-lg font-medium text-white">
                  {topic.replyCount}
                </div>
                <div className="text-xs text-gray-400">replies</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicList;
