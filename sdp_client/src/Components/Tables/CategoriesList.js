import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/viewCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/deleteCategory/${categoryId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      // Update the categories state after successful deletion
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    }
  };
 


  return (
    <div className="col-lg-5 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">CATEGORIES LIST</h4>
            <span>
              <Link to="/AddCategory" className="btn btn-primary">
                <strong>ADD CATEGORY</strong>
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
                  <th>Categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="py-1">{index + 1}</td>
                    <td>{category.categoryname}</td>
                    <td>
                    <Link
                            to="/EditCategory"
                            state={{ id: category._id }}
                          >
                            <button className="btn btn-success me-2">Edit</button>
                          </Link>
                    <button onClick={() => handleDelete(category._id)} className="btn btn-danger">Delete</button>
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

export default CategoriesList;
