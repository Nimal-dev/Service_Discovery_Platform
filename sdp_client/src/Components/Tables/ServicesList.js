import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ServicesList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:4000/provider/viewServices");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching Services:", error);
        setError("Failed to fetch Services. Please try again.");
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    
    fetch(
     `http://localhost:4000/provider/deleteService`,
     {
       method: "post",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ serviceId }),
     }
   ).then((res) => res.json())
   .then((result) => {
     console.log(result);
     setTimeout(() => {
         window.location.reload(); // Redirect to the home page after 2 seconds
       }, 1500);
      // Trigger a refresh
   })
   .catch((error) => {
     console.error("Error deleting Service:", error);
   })

};


  return (
    <div className="col-lg-5 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">SERVICES LIST</h4>
            <span>
              <Link to="/AddService" className="btn btn-primary">
                <strong>ADD SERVICES</strong>
              </Link>
            </span>
          </div>
          <br></br>
          <br></br>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td className="py-1">{index + 1}</td>
                    <td>{service.servicename}</td>
                    <td>{service.servicedescription}</td>
                    <td>₹{service.serviceprice}</td>
                    <td>
                    <Link
                            to="/EditService"
                            state={{ id: service._id }}
                          >
                            <button className="btn btn-success me-2">Edit</button>
                          </Link>
                    <button onClick={() => handleDelete(service._id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;
