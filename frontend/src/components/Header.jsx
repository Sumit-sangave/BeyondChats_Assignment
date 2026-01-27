import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowProfile(false);
  };

  return (
    <header className="articles-header">
      <div className="header-container">
        <div 
          className="header-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/logo.svg" alt="ArticleHub Logo" className="logo-image" />
          <span>ArticleHub</span>
        </div>
        <nav className="header-nav">
          <button 
            className="nav-link active"
            onClick={() => navigate("/articles")}
          >
            Articles
          </button>
          <button 
            className="nav-link"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          
          {isAuthenticated && user && (
            <div className="profile-menu">
              <button 
                className="profile-button"
                onClick={() => setShowProfile(!showProfile)}
                title={user.email}
              >
                <span className="profile-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="profile-name">{user.name}</span>
              </button>
              
              {showProfile && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <div className="profile-header">
                      <div className="profile-avatar-large">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="profile-details">
                        <p className="profile-user-name">{user.name}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="profile-divider"></div>
                  <button 
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
