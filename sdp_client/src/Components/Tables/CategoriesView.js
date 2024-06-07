import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CategoriesView() {
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">CATEGORIES LIST</h2>
      </div>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{category.categoryname}</h5>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default CategoriesView;
