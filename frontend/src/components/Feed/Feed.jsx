import React, { useState, useEffect } from "react";
import PostCard from "../PostCard/PostCard";
import { PostSkeleton } from "../Skeleton/Skeleton";
import postService from "../../api/postService";
import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts từ API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data.posts || data); // Tùy thuộc response structure
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="feed-container">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="feed-container">
        <div className="feed-error">
          <p>Failed to load posts: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="feed-container">
        <div className="feed-empty">
          <h3>No posts yet</h3>
          <p>Follow people to see their posts</p>
        </div>
      </div>
    );
  }

  // Render posts
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <PostCard key={post._id || post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
