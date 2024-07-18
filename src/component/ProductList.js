import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const data = await result.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  

  const deleteProduct = async (id) => {
    const url = `http://localhost:5000/productdelete/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const result = await response.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const searchHandle = async(e) => {
    let key  =  e.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        
      });
      result = await result.json()
      if(result) {
        setProducts(result)
      }

    }
  
    else {
      getProducts()
    }

  }



  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input type="search" placeholder='Search Product' className='search-product-box '
      onChange={searchHandle}
      />
      <ul className="header">
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
        <li>Operation</li>
        <li>Operation</li>

        
      </ul>
      {
      products.length > 0 ? products.map((item, index) => (
        <ul key={item._id} className="product-item">
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.company}</li>
          <li>{item.category}</li>

          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
          </li>
          <li>
            <Link to={`/update/${item._id}`}>
              <button>Update</button>
            </Link>
          </li>
        </ul>
      ))
    :
<h1>No Result Found </h1>
    
    }
    </div>
  );
}

export default ProductList;
