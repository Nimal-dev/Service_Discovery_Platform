import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ServiceProvidersList() {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/admin/viewServiceProviders"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Service Providers");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching Service Providers:", error);
        setError("Failed to fetch Service Providers. Please try again.");
      }
    };
    fetchProviders();
  }, []);

  const handleDelete = async (providerId) => {
    
       fetch(
        `http://localhost:4000/admin/deleteProvider`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ providerId }),
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
        console.error("Error deleting Customer:", error);
      })
   
  };
  return (
    <div class="col-lg-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="card-title">SERVICE PROVIDERS</h4>
            <span>
              <Link to="/AddProvider" class="btn btn-primary">
                <strong>ADD PROVIDER</strong>
              </Link>
            </span>
          </div>

          <br></br>
          <br></br>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Provider</th>
                  <th>Service Type</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((providers, index) => (
                  <tr key={index}>
                    <td className="py-1">{index + 1}</td>
                    <td>{providers.providername}</td>
                    <td>{providers.servicetype}</td>
                    <td>{providers.contact}</td>
                    <td>
                      <Link to="/EditProvider" state={{ id: providers._id }}>
                        <button className="btn btn-success me-2">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(providers._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
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

export default ServiceProvidersList;
