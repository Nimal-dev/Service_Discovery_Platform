import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';

function ServicesSection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/provider/viewPackage')
      .then(response => response.json())
      .then(data => setPackages(data))
      .catch(error => console.error('Error fetching packages:', error));
  }, []);

  return (
    <>
      <CustomerNavbar />
      <h1 style ={{color: 'black', marginLeft: '50px', marginTop:'50px'}}>Services</h1>
      <div className="product-section">
        <div className="container">
          <div className="row">
            {packages.map(pkg => (
              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={pkg._id}>
                <div className="product-item">
                  <img
                    src={`http://localhost:4000${pkg.imageUrl}`}
                    alt={pkg.packagename}
                    style={{ width: '290px', height: '245px' ,borderRadius:"10px 10px 5px 5px"}}
                    className="img-fluid product-thumbnail"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.jpg'; }} // Fallback image handling
                  />
                  <h3 className="product-title">{pkg.packagename}</h3>
                  <p className="card-text"><b>Services Provided:</b> {pkg.services.join(', ')}</p>
                  {/* <p className="card-text"><b>Provider:</b> {pkg.providerId.name}</p> Display provider name */}
                  <strong className="product-price">₹{pkg.packagePrice}</strong>
                  
                  <span className="icon-cross">
                    {/* <img src="img/cross.svg" className="img-fluid" alt="cross icon" /> */}
                    <a href="/products" className="btn btn-secondary"><i class="fa fa-cart-plus" aria-hidden="true"></i></a>
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
