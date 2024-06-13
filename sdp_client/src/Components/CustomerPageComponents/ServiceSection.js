import React, { useEffect, useState } from 'react';

function ServiceSection() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:4000/provider/viewServices')
      .then(response => response.json())
      .then(data => setServices(data.slice(0, 3))) // Limit to first 3 services
      .catch(error => console.error('Error fetching ServicesS:', error));
      
  }, []);
  

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/provider/viewServices");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch services");
  //       }
  //       const data = await response.json();
  //       setServices(data);
  //     } catch (error) {
  //       console.error("Error fetching services:", error);
  //       setError("Failed to fetch services. Please try again.");
  //     }
  //   };
  //   fetchServices();
  // }, []);

  // const addToCart = (productId) => {
  //   const userdata = JSON.parse(localStorage.getItem('userdata'));
  //   const customerId = userdata._id;

  //   fetch('http://localhost:4000/customer/AddCart', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ customerId, productId }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.success) {
  //         alert('Product added to cart successfully');
  //       } else {
  //         alert(data.message || 'Error adding product to cart');
  //       }
  //     })
  //     .catch(error => console.error('Error adding product to cart:', error));
  // };

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Finest Services by Service Providers</h2>
            <p className="mb-4">Growing Business meets the quality expected by a consumer, putting consumers in charge</p>
            <p><a href="/products" className="btn btn-secondary">Explore</a></p>
          </div>
          {services.map(service => (
            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={service._id}>
              <div className="product-item">
              {/* <img
                    src={`http://localhost:4000${service.imageUrl}`}
                    class="img-fluid product-thumbnail"
                    alt={service.name}
                    style={{ width: "290px", height: "200px" , borderRadius:"10px 10px 3px 3px"  }}
                  /> */}
                  <h1 className="product-title" style={{color:"black"}}>Service 1</h1>
                <h3 className="product-title">{service.servicename}</h3>
                <p>{service.description}</p>
                {/* <p>Seller: <b>{service.entrepreneurId.entrepreneurname}</b></p> */}
                <strong className="product-price">${service.serviceprice.toFixed(2)}</strong>
                <span className="icon-cross">
                <button 
                      // onClick={() => addToCart(service._id)} 
                      className="btn btn-secondary"
                    >
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                    </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
