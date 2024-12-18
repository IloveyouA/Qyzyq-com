import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

function HomePage() {
  return (
    <div className="container__box">
      <Navigation />
      <div className="main-container">
        <img className="background-image" src="/public/wall.jpg" alt="Tech Event Background" />

        {/* Overlay Content */}
        <div className="content">
          <div className="text-container">
            <h1 className="title">Join us</h1>
            <p className="subtitle">Jambyl Innovation High College</p>
          </div>
          <div className="details-container">
            <p className="event-date">Qyzyq.kz</p>
            <p className="event-location">Make your day full of adventures</p>
            <Link to="/" className="cta-button">
              Let's go
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
