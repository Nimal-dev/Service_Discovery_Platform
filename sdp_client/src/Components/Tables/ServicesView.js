import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";

function ServicesView() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:4000/provider/viewServices");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again.");
      }
    };
    fetchServices();
  }, []);

  const handleBooking = async (serviceId) => {
    // const userid = localStorage.getItem(userdata._id)
    // console.log(userid);
    const userId = localStorage.getItem("userdata");
    console.log('--------------------------------------');
    console.log(userId.fullname);
    console.log('--------------------------------------');
    if (!userId) {
      console.error("User ID not found. Please log in.");
      setError("User ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/provider/BookService", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId, customerId: userId }), // Include userId (customerId)
      });

      if (!response.ok) {
        throw new Error("Failed to book service");
      }

      const result = await response.json();
      console.log(result);

      setTimeout(() => {
        window.location.reload(); // Redirect to the home page after 2 seconds
      }, 1500);
    } catch (error) {
      console.error("Error booking service:", error);
      setError("Failed to book service. Please try again.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">SERVICES</h2>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{service.servicename}</h4>
                  <p className="card-text">{service.servicedescription}</p>
                  <p className="card-text"><strong>₹{service.serviceprice}</strong></p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => handleBooking(service._id)} className="btn btn-success w-100">
                      Book
                    </button>
                  </div>
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

export default ServicesView;
