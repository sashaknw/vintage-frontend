// components/forum/ReplyForm.jsx
import React, { useState } from "react";

const ReplyForm = ({ onSubmit, onCancel, initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
          placeholder="Write your reply here..."
          required
        ></textarea>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`px-4 py-2 bg-amber-700 text-white rounded-md ${
            isSubmitting || !content.trim()
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-amber-800"
          }`}
        >
          {isSubmitting ? "Posting..." : "Post Reply"}
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
