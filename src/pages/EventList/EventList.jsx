import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import { fetchEvents } from "../../utils/Api";
import Navigation from "../../components/Navigation/Navigation.jsx";
import "./EventList.css";

const categories = ["Game", "Music", "Technology", "Sports", "Culture"];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="events">
      <Navigation />
      <div className="event-list-container">
        <h1 className="event-list-title">Events</h1>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="categories-wrapper">
            {categories.map((category) => {
              const filteredEvents = events.filter((event) => event.category === category);

              if (filteredEvents.length === 0) return null;

              return (
                <div key={category} className="category-section">
                  <h2 className="category-title">{category}</h2>
                  <div className="event-grid">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
