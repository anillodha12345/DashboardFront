import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
           authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  return (
    <>
      <div className="product">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="InputBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className="invalid-input">Enter valid name</span>}
        <input
          type="text"
          placeholder="Enter your price"
          className="InputBox"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className="invalid-input">Enter valid price</span>}
        <input
          type="text"
          placeholder="Enter your category"
          className="InputBox"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className="invalid-input">Enter valid category</span>}
        <input
          type="text"
          placeholder="Enter your company"
          className="InputBox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className="invalid-input">Enter valid company</span>}
        <button className="appButton" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
