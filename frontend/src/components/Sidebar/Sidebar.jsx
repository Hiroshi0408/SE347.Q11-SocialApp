import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" />
        </svg>
      ),
      label: "Home",
      path: "/home",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
      label: "Search",
      path: "/search",
      onClick: () => alert("Search feature coming soon!"),
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
          <polyline points="22,7 13.03,12.7 2,7" />
        </svg>
      ),
      label: "Messages",
      path: "/messages",
      badge: 5,
      onClick: () => alert("Messages feature coming soon!"),
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      label: "Notifications",
      path: "/notifications",
      badge: 3,
      onClick: () => alert("Notifications feature coming soon!"),
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      label: "Explore",
      path: "/explore",
      onClick: () => alert("Explore feature coming soon!"),
    },
    {
      icon: (
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
      ),
      label: "Saved",
      path: "/saved",
      onClick: () => alert("Saved feature coming soon!"),
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "Profile",
      path: "/profile",
    },
  ];

  const handleNavigation = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        {/* Logo */}
        <div className="sidebar-logo" onClick={() => navigate("/home")}>
          <h1>SocialApp</h1>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile at bottom */}
        <div className="sidebar-footer">
          <button className="sidebar-user" onClick={() => navigate("/profile")}>
            <img
              src={user.avatar || "https://i.pravatar.cc/150?img=1"}
              alt={user.username}
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {user.fullName || user.username}
              </span>
              <span className="sidebar-user-username">@{user.username}</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
