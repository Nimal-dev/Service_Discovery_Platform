import React, { useEffect, useState } from 'react'
import AddCategory from '../Forms/AddCategory';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import Widgets from '../Common/Widgets';
import CategoriesList from '../Tables/CategoriesList';
import ServiceProvidersList from '../Tables/ServiceProvidersList';
import CustomersList from '../Tables/CustomersList';
// import StateList from '../Tables/StateList';
// import VolunteerList from '../Tables/VolunteerList';
// import UsersList from '../Tables/UsersList';

function AdminHome() {
    const [usertype, setUsertype] = useState(null);

    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      if (userdata && userdata.userid) {
        setUsertype(userdata.usertype); // Set the usertype from userdata
      }
    }, []);
    return (
    <>
    <Sidebar/>
    <div class="content">
    <Navbar/>
    <Widgets/>
    {/* {usertype === 0 ? <Widgets /> : null} Conditionally render Widgets based on usertype  */}
    <div class="container-fluid pt-4 px-4">
    <div class="row g-4">
        <CategoriesList/>
        <ServiceProvidersList/>
        <CustomersList/>
    </div>
    </div>
    </div>
    </>
      
    )
}

export default AdminHome;