import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useParams } from "react-router-dom"; // Import useParams for dynamic routing
import Navigation from "../../components/Navigation/Navigation"; // Import Navigation component (header)
import { MdCalendarMonth } from "react-icons/md"; // Import calendar icon
import { IoLocationSharp } from "react-icons/io5"; // Import location icon
import "./EventDetails.css"; // Import styles

import close__img from "/image.png"; // Close icon for modal

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null); // State to hold event data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State for handling errors
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [name, setName] = useState(""); // State for the user's name
  const [mobileNumber, setMobileNumber] = useState(""); // State for the user's mobile number

  // Fetch event details when the component mounts
  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      try {
        // Fetch event data from the API using the event ID
        const response = await axios.get(`https://6746985538c8741641d37ede.mockapi.io/createvents/${id}`);
        setEvent(response.data); // Set event data
      } catch (err) {
        setError("Event not found or failed to load"); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadEvent(); // Fetch event details
  }, [id]); // Trigger effect on ID change

  // Handle opening the payment modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Handle closing the payment modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle payment form submission
  const handlePaymentSubmit = async () => {
    const paymentData = {
      eventId: id, // Event ID
      name,
      mobileNumber,
      paymentTime: new Date().toISOString(), // Payment timestamp
    };

    try {
      // Send payment data to the server (mock API in this case)
      const response = await axios.post(
        "https://674d5c7e635bad45618aebb5.mockapi.io/payment",
        paymentData
      );

      console.log("Payment successful:", response.data);
      alert("Payment successful!");

      // Close modal and reset form fields after successful payment
      setModalOpen(false);
      setName("");
      setMobileNumber("");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinner for loading */}
      </div>
    );
  }

  // Show error message if fetching data failed
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render event details once data is loaded
  return (
    <div className="event-details">
      <Navigation /> 
      
      <h1 className="header__title" >{event.heading}</h1> 

      <div className="event-card__details">
        <img className="event-image" src={event.img} alt="Event" />
        <div className="event-info">
          <div className="first__colum">
            <h2 className="event-price">{event.price} $</h2>
            <p className="event-description">{event.description}</p>
          </div>
          <div className="second__colum">
            <p className="event-date-time">
              <MdCalendarMonth className="icon" />
              {event.date} | {event.time}
            </p>
            <p className="location">
              <IoLocationSharp className="icon" />
              {event.location}
            </p>
          </div>
          <button className="event-button" onClick={handleModalOpen}>
            Get Ticket
          </button>
        </div>
      </div>

      {/* Modal for payment */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={handleModalClose}>
              <img className="close__image" src={close__img} alt="Close" />
            </button>
            <h2>Enter Your Payment Information</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)} // Update mobile number state
            />
            <button className="modal-button" onClick={handlePaymentSubmit}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
