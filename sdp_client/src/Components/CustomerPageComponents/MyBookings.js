import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';

function MyBookings() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    fetch(`http://localhost:4000/customer/getOrders/${customerId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error('Error fetching orders:', data.message);
        }
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <>
      <CustomerNavbar />
      <div
        style={{
          backgroundColor: "#74512D",
          padding: "5px 0px 20px 0px",
        }}
      >
        <h1 style={{ marginLeft: "50px", marginTop: "20px" }}>My Bookings</h1>
      </div>
      <div className="site-blocks-table">
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <img src="./img/noBookings.png" alt="Image" className="img-fluid" style={{ width: "280px", height: "280px", padding: "30px" }} />
            <h2 style={{ color: 'black' }}>You have not booked any Services.</h2>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>₹{order.total.toFixed(2)}</td>
                  <td>
                    <ul>
                      {order.items.map(item => (
                        <li key={item.serviceId._id}>
                          {item.serviceId.servicename} - ₹{item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CustomerFooter />
    </>
  );
}

export default MyBookings;
