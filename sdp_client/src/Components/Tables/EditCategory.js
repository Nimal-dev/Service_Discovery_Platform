
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

function EditCategory() {
    const [categoryname, setCategoryName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/updateCategoryById', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ id: loc.state.id })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                const result = await response.json();
                setCategoryName(result.categoryDetails.categoryname);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };
        fetchCategoryDetails();
    }, [loc.state.id]);

    const updateCategory = () => {
        const params = {
            id: loc.state.id,
            categoryname: categoryname
        };
        fetch('http://localhost:4000/admin/updatecategory', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setMessage('Updated successfully');
            setTimeout(() => {
                setMessage('');
                navigate('/AdminHome');
            }, 2000);
        })
        .catch((error) => {
            console.error('Error updating category:', error);
        });
    };

    return (
        <>
      <Sidebar />
      <div className="content">
        <Navbar/>
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Update Service Category</h3>
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
                      value={categoryname}
                      onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Category Name</label>
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={updateCategory}
                  >
                    <strong>UPDATE</strong>   <i className="fa fa-edit"></i>
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

export default EditCategory;
