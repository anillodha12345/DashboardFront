import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const user = auth ? JSON.parse(auth) : null;

  return (
    <div>
      <img 
        src="https://alkhairtechnology.com.my/two/wp-content/uploads/2023/03/Al-KHAIR-500-x-500px.png" 
        alt="Al Khair Technology Logo" 
        className="logo" 
      />
      {user ? (
        <ul className="nav-ul">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup">Logout ({user.name})</Link></li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
