import React from "react";
import "./Skeleton.css";
// Skeleton làm các thành phần giao diện tạm thời hiển thị trong khi dữ liệu chính thức đang được tải về, nghĩa là nó giúp cải thiện trải nghiệm người dùng bằng cách cung cấp một hình ảnh đại diện cho nội dung sẽ xuất hiện sau này.

// Skeleton cho Post Card
export function PostSkeleton() {
  return (
    <div className="post-card skeleton-card">
      <div className="post-header">
        <div className="skeleton skeleton-avatar"></div>
        <div
          className="skeleton skeleton-text"
          style={{ width: "120px" }}
        ></div>
      </div>
      <div className="skeleton skeleton-image"></div>
      <div className="post-actions">
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-icon"></div>
      </div>
      <div className="post-info">
        <div
          className="skeleton skeleton-text"
          style={{ width: "100px" }}
        ></div>
        <div className="skeleton skeleton-text" style={{ width: "100%" }}></div>
        <div className="skeleton skeleton-text" style={{ width: "60%" }}></div>
      </div>
    </div>
  );
}

// Skeleton cho Story
export function StorySkeleton() {
  return (
    <div className="story-card">
      <div className="skeleton skeleton-story-avatar"></div>
      <div
        className="skeleton skeleton-text"
        style={{ width: "60px", height: "12px" }}
      ></div>
    </div>
  );
}

// Skeleton cho Suggestion
export function SuggestionSkeleton() {
  return (
    <div className="suggestion-item">
      <div className="skeleton skeleton-avatar-small"></div>
      <div style={{ flex: 1 }}>
        <div
          className="skeleton skeleton-text"
          style={{ width: "100px", marginBottom: "4px" }}
        ></div>
        <div
          className="skeleton skeleton-text"
          style={{ width: "140px", height: "12px" }}
        ></div>
      </div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
}
