import React from 'react'
import ServicesView from '../Tables/ServicesView';
import CategoriesView from '../Tables/CategoriesView';
import Navbar from '../Common/Navbar';

function CustomerHome() {
  return (
  <div className="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
        <CategoriesView/>
   <ServicesView/>
        </div>
        </div>
        </div>

  )
}

export default CustomerHome;