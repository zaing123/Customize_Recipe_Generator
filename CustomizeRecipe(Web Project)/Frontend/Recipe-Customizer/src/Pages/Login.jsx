import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7075/api/UsersApi");
      const users = response.data;

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
      );

      if (user) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userEmail", user.email);
        alert("Login successful!");
        navigate("/customize");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Something went wrong while logging in. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>👨‍🍳 Welcome Back, Chef!</h2>
      <input
        type="email"
        placeholder="🍽️ Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="🔒 Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>🍲 Login to Cook</button>
      <p>
        New to the kitchen? <a href="/signup">Create an account</a>
      </p>
    </div>
  );
};

export default Login;
