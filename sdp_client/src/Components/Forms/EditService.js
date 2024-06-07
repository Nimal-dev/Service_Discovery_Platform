import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Common/Sidebar";

function EditService() {
  const [servicename, setServicename] = useState("");
  const [servicedescription, setServicedescription] = useState("");
  const [serviceprice, setServiceprice] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const ids = { id: loc.state.id };
    fetch("http://localhost:4000/provider/updateServiceById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        setServicename(result.serviceDetails.servicename);
        setServicedescription(result.serviceDetails.servicedescription);
        setServiceprice(result.serviceDetails.serviceprice);
      });
  }, [loc.state.id]);

  const updateService = () => {
    const params = {
      id: loc.state.id,
      servicename: servicename,
      servicedescription: servicedescription,
      serviceprice: serviceprice,
    };
    fetch("http://localhost:4000/provider/editAndUpdateService", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/ServiceProviderHome");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Update Service</h3>
                </div>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="stateNameInput"
                      placeholder="Kerala Disaster management"
                      value={servicename}
                      onChange={(event) => setServicename(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Service Provider Name</label>
                  </div>
                  
                 
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      placeholder="Address"
                      value={servicedescription}
                      onChange={(event) => setServicedescription(event.target.value)}
                    />
                    <label htmlFor="addressInput">Description</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="contactInput"
                      placeholder="Price"
                      value={serviceprice}
                      onChange={(event) => setServiceprice(event.target.value)}
                    />
                    <label htmlFor="contactInput">Price(₹)</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={updateService}
                  >
                    <strong>UPDATE</strong>{" "}
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditService;
