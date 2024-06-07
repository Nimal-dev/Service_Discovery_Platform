import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let param = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/auth/signin", {
      method: "post",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log('data', data);
        if (data !== 'Invalid password' && data !== 'Invalid email' && data !== 'User not found') {
          localStorage.setItem("userdata", JSON.stringify(data));
          const userType = data.authid.usertype;

          if (userType === 0) {
            navigate('/AdminHome');
          } else if (userType === 1) {
            navigate('/ServiceProviderHome');
          } else if (userType === 2) {
            navigate('/CustomerHome');
          }  else {
            console.log("Unknown user type");
          }
        } else {
          console.log("Login failed: ", data);
        }
      });
    }).catch((error) => {
      console.error("Error during login:", error);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="/admin" className="">
                <h3 className="text-primary">SERVICE DISCOVERY PLATFORM</h3>
              </a>
              <h3>Sign In</h3>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="button" className="btn btn-primary py-3 w-100 mb-4" onClick={handleLogin}>Sign In</button>
            <p className="text-center mb-0">Don't have an Account? <a href="/Signup">Sign Up</a></p><br />
            <p className="text-center mb-0">Become a <a href="/ProviderSignup">Service Provider</a>!</p>
          </div>
        </div>
      </div>
    </div>
  );

}
export default SigninPage;