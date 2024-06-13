import React, { useEffect, useState } from 'react';

function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/entrepreneur/viewProductss')
      .then(response => response.json())
      .then(data => setProducts(data.slice(0, 3))) // Limit to first 3 products
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (productId) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    fetch('http://localhost:4000/customer/AddCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId, productId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Product added to cart successfully');
        } else {
          alert(data.message || 'Error adding product to cart');
        }
      })
      .catch(error => console.error('Error adding product to cart:', error));
  };

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Finest Products by Entrepreneurs</h2>
            <p className="mb-4">Growing Business meets the quality expected by a consumer, putting consumers in charge</p>
            <p><a href="/products" className="btn btn-secondary">Explore</a></p>
          </div>
          {products.map(product => (
            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={product._id}>
              <div className="product-item">
              <img
                    src={`http://localhost:4000${product.imageUrl}`}
                    class="img-fluid product-thumbnail"
                    alt={product.name}
                    style={{ width: "290px", height: "200px" , borderRadius:"10px 10px 3px 3px"  }}
                  />
                <h3 className="product-title">{product.name}</h3>
                <p>{product.description}</p>
                <p>Seller: <b>{product.entrepreneurId.entrepreneurname}</b></p>
                <strong className="product-price">${product.price.toFixed(2)}</strong>
                <span className="icon-cross">
                <button 
                      onClick={() => addToCart(product._id)} 
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

export default ProductSection;
