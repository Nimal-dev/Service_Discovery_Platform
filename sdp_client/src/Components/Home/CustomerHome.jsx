import React from 'react'
import CustomerNavbar from '../Common/CustomerNavbar'
import CustomerFooter from '../Common/CustomerFooter'

import ChooseUs from '../CustomerPageComponents/ChooseUs'
import HeroSection from '../CustomerPageComponents/HeroSection'
import ServiceSection from '../CustomerPageComponents/ServiceSection'

function CustomerHome() {
  return (
    <>
    <CustomerNavbar/>
    <HeroSection/>
    <ServiceSection/>
    <ChooseUs/>
    <CustomerFooter/>
    </>
  )
}

export default CustomerHome