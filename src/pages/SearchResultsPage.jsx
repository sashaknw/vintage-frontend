// pages/SearchResultsPage.jsx - Search results
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import forumService from "../services/forumService";
import { formatDistanceToNow } from "date-fns";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await forumService.searchTopics(query);
        setResults(data);
      } catch (err) {
        console.error("Error searching topics:", err);
        setError("Failed to search topics");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/community"
          className="text-amber-700 hover:text-amber-900 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Forum
        </Link>
        <h1 className="text-3xl font-serif font-bold text-amber-900 mt-2">
          Search Results
        </h1>
        <p className="text-gray-600 mt-1">for "{query}"</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-amber-700">Searching...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-700 mb-4">No results found for "{query}"</p>
          <p className="text-gray-600">
            Try different keywords or check our categories
          </p>
          <Link
            to="/community"
            className="mt-4 inline-block px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800"
          >
            Browse All Categories
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-amber-900">
              Found {results.length}{" "}
              {results.length === 1 ? "result" : "results"}
            </h2>
          </div>

          <div className="divide-y">
            {results.map((topic) => (
              <div
                key={topic._id}
                className="p-4 hover:bg-amber-50 transition-colors"
              >
                <Link to={`/community/topic/${topic._id}`} className="block">
                  <h3 className="font-medium text-amber-900 hover:text-amber-700">
                    {topic.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>Posted by {topic.author?.name || "Unknown"} • </span>
                    <span>
                      {formatDistanceToNow(new Date(topic.createdAt), {
                        addSuffix: true,
                      })}{" "}
                      •
                    </span>
                    <span>in {topic.category?.name}</span>
                  </div>
                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {topic.content.substring(0, 150)}
                    {topic.content.length > 150 ? "..." : ""}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
