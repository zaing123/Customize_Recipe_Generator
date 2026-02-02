import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">🍲 Recipe Customizer</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/customize">Custom Recipe</Link>
          <Link to="/ViewCustomRecipes">View Custom Recipes</Link>
          <Link to="/about">About Us</Link>

          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
