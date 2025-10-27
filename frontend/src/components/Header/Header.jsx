import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Lấy user và logout từ context

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <form onSubmit={handleSearch} className="header-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        <nav className="header-nav">
          <button
            className={`nav-icon ${isActive("/home") ? "active" : ""}`}
            onClick={() => navigate("/home")}
            title="Home"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isActive("/home") ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" />
            </svg>
          </button>

          <button className="nav-icon" title="Messages">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 1.68.46 3.25 1.27 4.6L3 21l5.4-1.27A8.96 8.96 0 0 0 12 21Z" />
            </svg>
          </button>

          <button className="nav-icon" title="Notifications">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="notification-badge">3</span>
          </button>

          <div className="nav-profile">
            <button
              className={`nav-icon ${isActive("/profile") ? "active" : ""}`}
              onClick={() => setShowMenu(!showMenu)}
              title="Profile"
            >
              <div
                className={`avatar-small ${
                  isActive("/profile") ? "avatar-active" : ""
                }`}
              >
                <img
                  src={user?.avatar || "images/Little wife.jpg"}
                  alt="Profile"
                />
              </div>
            </button>

            {showMenu && (
              <div className="profile-menu">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowMenu(false);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </button>
                <button>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  Saved
                </button>
                <button>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                  </svg>
                  Settings
                </button>
                <div className="menu-divider"></div>
                <button onClick={handleLogout} className="logout-btn">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
