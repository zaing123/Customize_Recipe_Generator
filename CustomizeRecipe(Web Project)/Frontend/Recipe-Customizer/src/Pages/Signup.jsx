import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("https://localhost:7075/api/UsersApi", {
        email,
        passwordHash: password
      });

      alert("Signup successful!");
      localStorage.setItem("userEmail", email);
      navigate("/customize");
    } catch (error) {
      console.error("❌ Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>🍳 Create Your Cooking Account</h2>
      
      <input
        type="email"
        placeholder="e.g. chef@cookmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Enter a tasty password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Repeat your tasty password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      <button onClick={handleSignup}>Start Cooking </button>
      
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Signup;
