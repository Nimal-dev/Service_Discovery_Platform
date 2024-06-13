import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';

function ServicesSection() {
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

  return (
    <>
      <CustomerNavbar />
      <h1 style={{ color: 'black', marginLeft: '50px', marginTop: '50px' }}>Services</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="product-section">
        <div className="container">
          <div className="row">
            {services.map(service => (
              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={service._id}>
                <div className="product-item" style={{border:"1px solid", borderRadius:"20px",padding:"10px"}}>
                  {/* <img
                    src={`http://localhost:4000${pkg.imageUrl}`}
                    alt={pkg.packagename}
                    style={{ width: '290px', height: '245px', borderRadius: "10px 10px 5px 5px" }}
                    className="img-fluid product-thumbnail"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.jpg'; }} // Fallback image handling
                  /> */}
                  <h3 className="product-title">{service.servicename}</h3>
                  <p className="card-text" style={{padding:"10px"}}> {service.servicedescription}</p>
                  <strong className="product-price">₹{service.serviceprice}</strong>
                  <span className="icon-cross">
                    {/* <img src="img/cross.svg" className="img-fluid" alt="cross icon" /> */}
                    <a href="/products" className="btn btn-secondary"><i className="fa fa-cart-plus" aria-hidden="true"></i></a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
}

export default ServicesSection;
