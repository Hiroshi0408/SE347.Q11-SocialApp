import React, { useState } from "react";
import postService from "../../api/postService";
import "./PostCard.css";

function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentsList || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle like
  const handleLike = async () => {
    try {
      // Optimistic update
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);

      // Call API
      await postService.toggleLike(post._id || post.id);
    } catch (error) {
      // Rollback nếu error
      setIsLiked(isLiked);
      setLikes(likes);
      console.error("Failed to toggle like:", error);
    }
  };

  // Double click ảnh để like
  const handleDoubleClick = async () => {
    if (!isLiked) {
      try {
        setIsLiked(true);
        setLikes(likes + 1);
        await postService.toggleLike(post._id || post.id);
      } catch (error) {
        setIsLiked(false);
        setLikes(likes);
        console.error("Failed to like:", error);
      }
    }
  };

  // Toggle save
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Add comment với API
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Call API
      const response = await postService.addComment(
        post._id || post.id,
        newComment
      );

      // Add comment to list
      setComments([...comments, response.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="post-avatar"
          />
          <span className="post-username">{post.user.username}</span>
        </div>

        <button className="post-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
      <p className="post-caption">{post.caption}</p>
      {/* Post media */}
      <div className="post-media" onDoubleClick={handleDoubleClick}>
        {post.content.type === "image" ? (
          <img src={post.content.url} alt="Post" />
        ) : post.content.type === "video" ? (
          <video controls>
            <source src={post.content.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button
            className={`action-btn ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? "#ed4956" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button
            className="action-btn"
            onClick={() => setShowComments(!showComments)}
          >
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

          <button className="action-btn">
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

        <button
          className={`action-btn ${isSaved ? "saved" : ""}`}
          onClick={handleSave}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Post Info */}
      <div className="post-info">
        <p className="post-likes">
          <strong>{likes.toLocaleString()} likes</strong>
        </p>
        {/* Comments Section */}
        {comments.length > 0 && (
          <>
            {!showComments && (
              <button
                className="view-comments"
                onClick={() => setShowComments(true)}
              >
                View all {comments.length} comments
              </button>
            )}

            {showComments && (
              <div className="comments-section">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <p className="comment-text">
                        <strong>{comment.user.username}</strong> {comment.text}
                      </p>
                      <div className="comment-meta">
                        <span className="comment-timestamp">
                          {comment.timestamp}
                        </span>
                        <span className="comment-likes">
                          {comment.likes} likes
                        </span>
                        <button className="comment-reply">Reply</button>
                      </div>
                    </div>
                    <button className="comment-like-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <p className="post-timestamp">{post.timestamp}</p>
      </div>

      {/* Add Comment */}
      <form onSubmit={handleAddComment} className="post-add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="comment-btn"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </form>
    </article>
  );
}

export default PostCard;
