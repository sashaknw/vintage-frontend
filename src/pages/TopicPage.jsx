import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import forumService from "../services/forumService";
import TopicDetail from "../components/forum/TopicDetail";

const TopicPage = () => {
  const { topicId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          // In a real implementation, you'd check if the user's ID is in the followers array
          // For this example, we'll just set a default state
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
      // Redirect to login
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
      // Redirect to login
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

      return newReply;
    } catch (err) {
      console.error("Error posting reply:", err);
      throw err;
    }
  };

  // Handle liking a reply
  const handleLike = async (replyId) => {
    if (!isAuthenticated) {
      // Redirect to login
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-amber-700">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8 text-center">
          <p className="text-red-600">{error || "Topic not found"}</p>
          <Link
            to="/community"
            className="text-amber-700 hover:text-amber-900 mt-4 inline-block"
          >
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to={`/community/category/${topic.category._id}`}
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
          Back to {topic.category.name}
        </Link>
      </div>

      <TopicDetail
        topic={topic}
        replies={replies}
        onFollow={handleFollow}
        onReply={handleReply}
        onLike={handleLike}
        following={following}
      />
    </div>
  );
};

export default TopicPage;
