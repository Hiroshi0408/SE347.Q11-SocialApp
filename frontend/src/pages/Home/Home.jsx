import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Stories from "../../components/Stories/Stories";
import Feed from "../../components/Feed/Feed";
import Suggestions from "../../components/Suggestions/Suggestions";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Main content */}
      <div className="home-content-wrapper">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="home-main">
          <div className="home-container">
            {/* Left + Center Column */}
            <div className="home-content">
              <Stories />
              <Feed />
            </div>

            {/* Right Column - Suggestions */}
            <aside className="home-sidebar">
              <Suggestions />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
