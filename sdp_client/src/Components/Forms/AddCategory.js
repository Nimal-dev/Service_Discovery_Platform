import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [categoryname, setCategoryname] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const saveState = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    let params = {
        categoryname: categoryname,
    };
    fetch("http://localhost:4000/admin/AddCategory", {
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
        setMessage("Category added successfully.");
        // Clear form fields after successful submission
        setCategoryname("");
        // setError("");
      })
      .catch((error) => {
        console.error("Error adding Category:", error);
        // Show error message
        setMessage("Failed to add Category. Please try again.");
      });
    setTimeout(() => {
      navigate('/AdminHome');
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
                  <h3>Add Service Category</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form>
                  {/*------------------------- State Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="categoryNameInput"
                      placeholder="Category Name"
                      name="categoryname"
                      onChange={(event) => setCategoryname(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Category Name</label>
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={saveState}
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

export default AddCategory;
