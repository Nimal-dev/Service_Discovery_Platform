import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddProvider() {
    const [providername, setProviderName] = useState("");
    const [contact, setContact] = useState("");
    const [servicetype, setServiceType] = useState("");
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch("http://localhost:4000/admin/viewCategories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  
    const registerProvider = () => {
      let params = {
        providername: providername,
        contact: contact,
        location: location,
        servicetype: servicetype,
        address: address,
        email: email,
        password: password,
        usertype: 1,
      };
      fetch("http://localhost:4000/auth/providerSignup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "applizcation/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === "success") {
            setMessage("Registered successfully");
          } else {
            setMessage("Registration failed");
          }
          console.log(result);
        });
    };
  
    useEffect(() => {
      if (message === "Registered successfully") {
        setTimeout(() => {
          navigate("/AdminHome"); // Redirect to the home page after 2 seconds
        }, 1500);
      }
    }, [message, navigate]);
  
    return (
      <div class="container-fluid">
        <div
          class="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" class="">
                  <h3 class="text-primary">DMS SERVICE PROVIDER</h3>
                </a>
                <h3>ADD PROVIDER</h3>
              </div>
              {message && <div className="alert alert-info">{message}</div>}{" "}
              {/* Display message */}
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingText"
                  placeholder="Full Name"
                  onChange={(e) => setProviderName(e.target.value)}
                />
                <label for="floatingText">Full Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control"
                  id="floatingText"
                  placeholder="Phone Number"
                  onChange={(e) => setContact(e.target.value)}
                />
                <label for="floatingText">Contact</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingText"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <label for="floatingText">Location</label>
              </div>
              <div class="bg-secondary rounded h-100 p-6 ">
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-sm example"
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option selected>Select Service Type</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryname}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  class="form-control"
                  placeholder="Enter Volunteer Address"
                  id="floatingTextarea"
                  name="address"
                  style={{ height: "100px" }}
                  onChange={(event) => setAddress(event.target.value)}
                ></textarea>
                <label for="floatingTextarea">Address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>
              <button
                type="butoon"
                class="btn btn-primary py-3 w-100 mb-4"
                onClick={registerProvider}
              >
            ADD SERVICE PROVIDER
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddProvider