import React from 'react'
import CustomerNavbar from '../Common/CustomerNavbar'
import CustomerFooter from '../Common/CustomerFooter'
import ProductSection from '../CustomerPageComponents/ProductSection'
import ChooseUs from '../CustomerPageComponents/ChooseUs'

function CustomerHome() {
  return (
    <>
    <CustomerNavbar/>
    <ProductSection/>
    <ChooseUs/>
    <CustomerFooter/>
    </>
  )
}

export default CustomerHome