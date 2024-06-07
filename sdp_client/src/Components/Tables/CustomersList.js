import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/viewCustomers");
        if (!response.ok) {
          throw new Error("Failed to fetch Customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching Customers:", error);
        setError("Failed to fetch Customers. Please try again.");
      }
    };
    fetchCustomers();
  }, []);
  

  // const handleDelete =(iD)=>{
  //   let params={
  //       id:iD
  //   }
  //   console.log(params,'qwertyuioiutrew');
  //   fetch("http://localhost:4000/admin/deleteCustomer", {
  //       method: "post",
  //               headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json"
  //               },
  //               body: JSON.stringify(params),
  //   }).then((res)=>res.json()).then((result)=>{
  //       console.log(result);
  //   })
  // }

  const handleDelete =(customersId) => {
     fetch(`http://localhost:4000/admin/deleteCustomer`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",},
          body: JSON.stringify({ customersId }),
      })
      
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTimeout(() => {
            window.location.reload(); // Redirect to the home page after 2 seconds
          }, 1500);
         // Trigger a refresh
      })
      .catch((error) => {
        console.error("Error deleting Customer:", error);
      });
    }
  return (
    <div class="col-12">
    <div class="bg-secondary rounded h-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">CUSTOMERS LIST</h5>
              {/* <Link className="btn btn-primary" to="/AddState">ADD USER</Link> */}
            </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                  
                  <tr key={index}>
                    <td className="py-1">{index + 1}</td>
                    
                    
                    <td>{customer.fullname}</td>
                    <td>{customer.authid.email}</td>
                    <td>{customer.contact}</td>
                    <td>{customer.address}</td>
                    <td>
                    <button onClick={() => handleDelete(customer._id)} className="btn btn-danger">Delete</button>
                    
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default CustomersList