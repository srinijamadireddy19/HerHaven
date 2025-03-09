import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";



const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userResponse = await axios.get(
        `http://localhost:3000/users?username=${credentials.username}`
      );
      const user = userResponse.data[0];

      if (!user) {
        setError("Username does not exist");
        return;
      }

      if (user.password !== credentials.password) {
        setError("Incorrect password");
        return;
      }

      login(user); 


      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
      <div className="signup-container">
        <h2>Welcome Back</h2>
        <p>Login to continue to HerHaven</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

  );
};

export default Login;