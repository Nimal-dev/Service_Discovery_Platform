import React from 'react'
import CustomerNavbar from '../Common/CustomerNavbar'
import CartContents from './CartContents'
import CustomerFooter from '../Common/CustomerFooter'

function Cart() {
  return (
    <>
    <CustomerNavbar/>
    {/* -------------Top Bar Start--------------- */}
    <div
        style={{
            backgroundColor: "#74512D",
            padding: "5px 0px 20px 0px",
            
            }}
            >
        <h1 style={{ marginLeft: "50px", marginTop: "20px" }}>CART</h1>
      </div>
          {/* -------------Top Bar End--------------- */}
    <CartContents/>
    <CustomerFooter />
    </>
  )
}

export default Cart