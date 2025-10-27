import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PostModal from "../../components/PostModal/PostModal";
import { userProfile } from "../../data/mock-data";
import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function Profile() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts"); // posts, saved, tagged

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="profile-content-wrapper">
        <Header />

        <main className="profile-main">
          <div className="profile-container">
            {/* Profile Header */}
            <header className="profile-header">
              {/* Avatar */}
              <div className="profile-avatar-container">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.username}
                  className="profile-avatar"
                />
              </div>

              {/* Profile Info */}
              <div className="profile-info">
                {/* Username & Actions */}
                <div className="profile-top">
                  <h2 className="profile-username">{userProfile.username}</h2>
                  <button className="profile-edit-btn">Edit profile</button>
                  <button className="profile-settings-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                      <line x1="2" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="22" y2="12" />
                      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {userProfile.stats.posts}
                    </span>
                    <span className="stat-label">posts</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {userProfile.stats.followers.toLocaleString()}
                    </span>
                    <span className="stat-label">followers</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {userProfile.stats.following}
                    </span>
                    <span className="stat-label">following</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="profile-bio">
                  <p className="profile-fullname">{userProfile.fullName}</p>
                  <p className="profile-bio-text">{userProfile.bio}</p>
                  {userProfile.website && (
                    <a
                      href={userProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-website"
                    >
                      {userProfile.website}
                    </a>
                  )}
                </div>
              </div>
            </header>

            {/* Tabs */}
            <div className="profile-tabs">
              <button
                className={`profile-tab ${
                  activeTab === "posts" ? "active" : ""
                }`}
                onClick={() => setActiveTab("posts")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>POSTS</span>
              </button>
              <button
                className={`profile-tab ${
                  activeTab === "saved" ? "active" : ""
                }`}
                onClick={() => setActiveTab("saved")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>SAVED</span>
              </button>
              <button
                className={`profile-tab ${
                  activeTab === "tagged" ? "active" : ""
                }`}
                onClick={() => setActiveTab("tagged")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 5.4 7.9 13.9 8 14 .1-.1 8-8.6 8-14z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>TAGGED</span>
              </button>
            </div>

            {/* Posts Grid */}
            <div className="profile-posts-grid">
              {userProfile.posts.map((post) => (
                <div
                  key={post.id}
                  className="profile-post-item"
                  onClick={() => openPostModal(post)}
                >
                  <img src={post.image} alt="Post" />
                  <div className="profile-post-overlay">
                    <div className="overlay-stats">
                      <span className="overlay-stat">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {post.likes}
                      </span>
                      <span className="overlay-stat">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State nếu không có posts */}
            {userProfile.posts.length === 0 && (
              <div className="profile-empty">
                <div className="empty-icon">
                  <svg
                    width="62"
                    height="62"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>No Posts Yet</h3>
                <p>When you share photos, they'll appear on your profile.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Modal xem post */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={closePostModal} />
      )}
    </div>
  );
}

export default Profile;
