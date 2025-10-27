import React from "react";
import { storiesData } from "../../data/mock-data";
import "./Stories.css";

function Stories() {
  const handleStoryClick = (story) => {
    console.log("Open story:", story.username);
  };

  return (
    <div className="stories-container">
      <div className="stories-wrapper">
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="story-card"
            onClick={() => handleStoryClick(story)}
          >
            {/* Avatar với border gradient nếu chưa xem */}
            <div className={`story-avatar ${story.seen ? "seen" : "unseen"}`}>
              <img src={story.avatar} alt={story.username} />

              {/* Nút + cho story của mình */}
              {story.isOwn && (
                <button className="add-story-btn">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                    <path d="M6 0v12M0 6h12" stroke="white" strokeWidth="2" />
                  </svg>
                </button>
              )}
            </div>

            {/* Username */}
            <span className="story-username">
              {story.isOwn ? "Your story" : story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
