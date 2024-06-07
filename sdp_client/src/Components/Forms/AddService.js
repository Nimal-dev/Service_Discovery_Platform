import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddService() {
  const [servicename, setServicename] = useState("");
  const [servicedescription, setServicedescription] = useState("");
  const [serviceprice, setServiceprice] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const saveService = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    let params = {
        servicename: servicename,
        servicedescription:servicedescription,
        serviceprice:serviceprice,

    };
    fetch("http://localhost:4000/provider/AddService", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Service added successfully.");
        // Clear form fields after successful submission
        setServicename("");
        setServicedescription("");
        setServiceprice("");
        // setError("");
      })
      .catch((error) => {
        console.error("Error adding Service:", error);
        // Show error message
        setMessage("Failed to add Service. Please try again.");
      });
    setTimeout(() => {
      navigate('/ServiceProviderHome');
    }, 2000);
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
                  <h3>Add Service</h3>
                </div>
{/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form>
{/*------------------------- Service Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="categoryNameInput"
                      placeholder="Service Name"
                      name="categoryname"
                      onChange={(event) => setServicename(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Service Name</label>
                  </div>
{/*------------------------- Service Description Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                <textarea
                  class="form-control"
                  placeholder="Enter Volunteer Address"
                  id="floatingTextarea"
                  name="servicedescription"
                  style={{ height: "100px" }}
                  onChange={(event) => setServicedescription(event.target.value)}
                ></textarea>
                <label for="floatingTextarea">Service Info</label>
              </div>

{/*------------------------- Service Price Input ---------------------------------*/}
              <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="servicepriceInput"
                      placeholder="serviceprice"
                      name="serviceprice"
                      onChange={(event) => setServiceprice(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Price (₹)</label>
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={saveService}
                  >
                    <strong>CREATE</strong>
                    <i className="fa fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddService;
