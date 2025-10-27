import React, { useEffect } from "react";
import "./PostModal.css";

function PostModal({ post, onClose }) {
  // Close khi nhấn ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll khi modal mở
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.88a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </button>

        <div className="modal-body">
          {/* Left - Image */}
          <div className="modal-image-container">
            <img src={post.image} alt="Post" className="modal-image" />
          </div>

          {/* Right - Details */}
          <div className="modal-details">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-user">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  className="modal-avatar"
                />
                <span className="modal-username">your_username</span>
              </div>
              <button className="modal-menu-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>

            {/* Comments/Caption Area */}
            <div className="modal-comments">
              <p className="modal-caption">
                <strong>your_username</strong> This is a beautiful photo! 📸
              </p>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <div className="modal-action-buttons">
                <button className="modal-action-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <button className="modal-action-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </button>
                <button className="modal-action-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                </button>
              </div>
              <button className="modal-action-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>

            {/* Likes */}
            <div className="modal-likes">
              <strong>{post.likes} likes</strong>
            </div>

            {/* Timestamp */}
            <div className="modal-timestamp">2 HOURS AGO</div>

            {/* Add Comment */}
            <div className="modal-add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                className="modal-comment-input"
              />
              <button className="modal-comment-btn">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
