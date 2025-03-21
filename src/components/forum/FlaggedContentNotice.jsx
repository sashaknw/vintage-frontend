import React, { useState } from "react";
import { Link } from "react-router-dom";

const FlaggedContentNotice = ({
  contentType = "post",
  issues = [],
  onSubmitAnyway,
  onModify,
  onCancel,
  originalContent = "",
}) => {
  const [editedContent, setEditedContent] = useState(originalContent);
  const [isEditing, setIsEditing] = useState(false);

  // Handle submitting the modified content
  const handleSubmitModified = () => {
    onModify(editedContent);
  };

  // Generate a brief summary of issues
  const getIssueSummary = () => {
    const issueTypes = issues.map((issue) => issue.type);
    const uniqueTypes = [...new Set(issueTypes)];

    return uniqueTypes
      .map((type) => {
        switch (type) {
          case "profanity":
            return "inappropriate language";
          case "spam":
            return "potential spam content";
          case "harassment":
            return "potentially harmful content";
          case "promotional":
            return "promotional content";
          case "off-topic":
            return "off-topic content";
          case "scam":
            return "suspicious links or claims";
          default:
            return type;
        }
      })
      .join(", ");
  };

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="text-amber-500 flex-shrink-0 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="flex-grow">
          <h3 className="font-medium text-amber-800 mb-1">
            Your {contentType} may not meet our community guidelines
          </h3>

          <p className="text-sm text-amber-700 mb-3">
            Our AI moderator has flagged this content for {getIssueSummary()}.
            Please review our{" "}
            <Link
              to="/community/guidelines"
              className="underline hover:text-amber-800"
            >
              community guidelines
            </Link>
            .
          </p>

          {issues.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-amber-800 mb-1">
                Issues detected:
              </p>
              <ul className="list-disc pl-5 text-sm text-amber-700">
                {issues.map((issue, idx) => (
                  <li key={idx}>{issue.explanation}</li>
                ))}
              </ul>
            </div>
          )}

          {isEditing ? (
            <div className="mt-4">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-3 border border-amber-300 rounded-md h-32 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Edit your content..."
              />

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={handleSubmitModified}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Submit Edited Version
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50"
                >
                  Cancel Editing
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Edit My {contentType}
              </button>

              <button
                onClick={onSubmitAnyway}
                className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50"
              >
                Submit Anyway for Review
              </button>

              <button
                onClick={onCancel}
                className="px-4 py-2 bg-white text-gray-600 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          )}

          <p className="text-xs text-amber-600 mt-3">
            Content submitted with issues flagged will be reviewed by our
            moderation team before appearing in the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlaggedContentNotice;
