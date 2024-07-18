import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Move useNavigate outside handleLogin

  const handleLogin = async () => {
    try {
      console.log(
        "Attempting to login with email and password:",
        email,
        password
      );

      let response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      // if (result.name) {
      //   localStorage.setItem("user", JSON.stringify(result)); // Correct usage of JSON.stringify
      //   navigate("/"); // Navigate to home page after successful login
      // } 
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user)); // Correct usage of JSON.stringify
        localStorage.setItem("token", JSON.stringify(result.auth)); // Correct usage of JSON.stringify

        navigate("/"); // Navigate to home page after successful login
      }
      
      else {
        alert("Please Enter Correct details");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="InputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
      />
      <input
        className="InputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      />
      <button className="appButton" onClick={handleLogin} type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
