import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Function to handle product update
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/updateproduct/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });

      
      const result = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        alert("Failed to update product: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/productupdate/${params.id}`,{
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        const result = await response.json();

        if (response.ok) {
          setName(result.name);
          setPrice(result.price);
          setCategory(result.category);
          setCompany(result.company);
        } else {
          alert("No product found");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch product details");
      }
    };

    getProductDetails();
  }, [params.id]); // Dependency array to ensure this runs only when params.id changes

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="InputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product price"
        className="InputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product category"
        className="InputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        className="InputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
