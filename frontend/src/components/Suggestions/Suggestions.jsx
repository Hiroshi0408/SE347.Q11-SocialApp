import React, { useState } from "react";
import { suggestedUsers, currentUser } from "../../data/mock-data";
import "./Suggestions.css";

function Suggestions() {
  const [users, setUsers] = useState(suggestedUsers);

  // Toggle follow/unfollow
  const handleFollow = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="suggestions-container">
      {/* Current User Profile */}
      <div className="current-user">
        <img
          src={currentUser.avatar}
          alt={currentUser.username}
          className="current-user-avatar"
        />
        <div className="current-user-info">
          <span className="current-user-username">{currentUser.username}</span>
          <span className="current-user-name">{currentUser.fullName}</span>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      {/* Suggestions Header */}
      <div className="suggestions-header">
        <span className="suggestions-title">Suggestions For You</span>
        <button className="see-all-btn">See All</button>
      </div>

      {/* Suggestions List */}
      <div className="suggestions-list">
        {users.map((user) => (
          <div key={user.id} className="suggestion-item">
            <img
              src={user.avatar}
              alt={user.username}
              className="suggestion-avatar"
            />
            <div className="suggestion-info">
              <span className="suggestion-username">{user.username}</span>
              <span className="suggestion-subtitle">{user.subtitle}</span>
            </div>
            <button
              className={`follow-btn ${user.isFollowing ? "following" : ""}`}
              onClick={() => handleFollow(user.id)}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <footer className="suggestions-footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Press</a>
          <a href="#">API</a>
          <a href="#">Jobs</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <p className="footer-copyright">© 2025 SOCIALAPP FROM HIROSHI</p>
      </footer>
    </div>
  );
}

export default Suggestions;
