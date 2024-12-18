import { Link } from "react-router-dom";
import React from "react";
import "./EventCard.css";

const EventCard = ({ id, heading, date, location, img, category }) => {
  let year, month;

  // Safely parse date
  try {
    [year, month] = date.split("-");
  } catch {
    year = "Unknown";
    month = "Unknown";
  }

  return (
    <Link
      to={`/`}
      className="event-card-link"
      aria-label={`View details for event: ${heading}`}
    >
      <div className="card">
        <span className="card-image-wrapper">
          <img src={img} alt={`Event: ${heading}`} className="card-image" />
        </span>
        <div className="card-content">
          <h3 className="card-title">{heading}</h3>
          <p className="card-category">{category}</p>
          <p className="card-description">{`${month} / ${year}`}</p>
          <p className="card-location">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
