import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../UserContext/UserContext";
import "./Navigation.css";
import profile_icon from "/business-global-economy_24877-41082.png";

const Navigation = () => {
  const { userName, userProfileImage } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getAvatar = (name, imageUrl) => {
    if (imageUrl) {
      return <img src={imageUrl} alt="Profile" className="avatar-img" />;
    }
    return <img src={profile_icon} alt="Default Avatar" className="avatar-img" />;
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">Qyzyq.</Link>
      </div>

      {/* Burger Icon */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "nav-active" : ""}`}>
        <li><Link to="/home-page" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Event</Link></li>
        <li><Link to="/creat-event" onClick={() => setIsMenuOpen(false)}>Create Event</Link></li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>

      {/* Profile Section */}
      <div className="profile">
        {userName ? (
          <div className="user-info">
            <Link to="/profile-page" className="avatar">
              {getAvatar(userName, userProfileImage)}
            </Link>
            <span className="user-name">{userName}</span>
            <Link className="login-btn" to="/login-sign">Logout</Link>
          </div>
        ) : (
          <Link className="login-btn" to="/login-sign">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
