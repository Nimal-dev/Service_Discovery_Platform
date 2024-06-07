import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import ServiceProviderProfile from "../Tables/ServiceProviderProfile";
import ServicesList from "../Tables/ServicesList";
import BookingsList from "../Tables/BookingsList";



function ProviderHome() {
  return (
    <>
    <Sidebar />
    <div className="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <ServicesList/>
          <BookingsList/>
            {/* <ServiceProviderProfile/> */}
          
        </div>
      </div>
    </div>
  </>
  )
}

export default ProviderHome;