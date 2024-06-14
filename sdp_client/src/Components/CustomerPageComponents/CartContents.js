import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import CustomerFooter from '../Common/CustomerFooter';


function CartContents() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate ();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    fetch(`http://localhost:4000/customer/getCart/${customerId}`)
      .then(response => response.json())
      .then(data => setCartItems(data.items))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const removeItem = (productId) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    fetch(`http://localhost:4000/customer/removeFromCart/${customerId}/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCartItems(prevItems => prevItems.filter(item => item.productId._id !== productId));
        }
      })
      .catch(error => console.error('Error removing item:', error));
  };

  const proceedToCheckout = () => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;
    const address = prompt("Please enter your address");

    if (!address) {
      alert("Address is required to proceed to checkout");
      return;
    }

    fetch('http://localhost:4000/customer/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId, address }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Order placed successfully');
          navigate('/checkout', { state: { cartItems: [] } });  // Assuming checkout page will display a confirmation message
        } else {
          alert('Error placing order: ' + data.message);
        }
      })
      .catch(error => console.error('Error placing order:', error));
  };



 

  return (
    <>
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                <img src="./img/empty-cart.png" alt="Image" className="img-fluid" style={{width:"300px", height:"300px"}} /> 
                <h2 style={{ color: 'black' }}>No Products in the cart. Add items to cart</h2>
              </div>
                ) : (
                  <table className="tables">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.productId._id}>
                          <td className="product-thumbnail">
                            <img src={`http://localhost:4000${item.productId.imageUrl}`} alt="Image" className="img-fluid" />
                          </td>
                          <td className="product-name">
                            <h2 className="h5">{item.productId.name}</h2>
                          </td>
                          <td>₹{item.productId.price.toFixed(2)}</td>
                          <td> <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                removeItem(item.productId._id);
                              }}
                            >
                              X
                            </button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </form>
          </div>
          {cartItems.length > 0 && (
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6">
                    <a className="btn btn-secondary" href='/CustomerHome'>Continue Shopping</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">Subtotal</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">₹{cartItems.reduce((acc, item) => acc + item.productId.price, 0).toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">₹{cartItems.reduce((acc, item) => acc + item.productId.price, 0).toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button className="btn btn-secondary btn-lg py-3 px-10 mb-5" onClick={proceedToCheckout}>Proceed To Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
}

export default CartContents;
