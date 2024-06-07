import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
        const response = await fetch(`http://localhost:4000/provider/viewBookings?customerId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again.");
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Booked Services</h2>
        </div>
        <div className="row">
          {bookings.map((booking, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{booking.serviceName}</h4>
                  <p className="card-text">{booking.serviceDescription}</p>
                  <p className="card-text"><strong>₹{booking.servicePrice}</strong></p>
                  <p className="card-text">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  );
}

export default BookingList;
