import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const firstName = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    navigate('/ngologin');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <button className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Home/AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="/Home/team">Team</Link>
        </li>
        <li>
          <Link to="Home/contact-us">Contact Us</Link>
        </li>
        {authToken && (
          <li className="welcome">
            <span>Welcome, {firstName}</span>
          </li>
        )}
        {authToken ? (
          <li className="logout button-3" role="button">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        ) : (
          <li className="login button-3" role="button">
            <Link to="/ngologin" className="login-link" style={{ color: '#fff' }}>Login</Link>
          </li>
        )}
      </ul>
      {/* <ul className="loginul">
        
      </ul> */}
    </nav>
  );
};

export default Navbar;
