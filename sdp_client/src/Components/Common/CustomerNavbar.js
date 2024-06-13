import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CustomerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    navigate('/');
  };

  return (
    <>
      <nav className="customer-navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
        <div className="container">
          <a className="navbar-brand" href="index.html">DONATION PLATFORM</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="customer-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className={`nav-item ${currentPath === '/CustomerHome' ? 'active' : ''}`}>
                <a className="nav-link" href="/CustomerHome">Home</a>
              </li>
              {/* <li className={`nav-item ${currentPath === '/products' ? 'active' : ''}`}>
                <a className="nav-link" href="/products">Products</a>
              </li> */}
              <li className={`nav-item ${currentPath === '/Services' ? 'active' : ''}`}>
                <a className="nav-link" href="/Services">Services</a>
              </li>
              <li className={`nav-item ${currentPath === '/MyOrders' ? 'active' : ''}`}>
						<a class="nav-link" href="/MyOrders">My Bookings</a>
              </li>
              <li className={`nav-item ${currentPath === '/Cart' ? 'active' : ''}`}>
						<a class="nav-link" href="/Cart"><img src="img/cart.svg"/><strong> Cart</strong></a>
              </li>
              {/* <li className={`nav-item ${currentPath === '/about' ? 'active' : ''}`}>
                <a className="nav-link" href="/about">About us</a>
              </li> */}
            </ul>
            <a className="btn btn-primary" onClick={handleLogout}><b>Log Out</b></a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default CustomerNavbar;
