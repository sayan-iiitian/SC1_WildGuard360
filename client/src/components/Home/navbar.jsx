import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        
      </ul>
      <ul className='loginul'>
      <li className="login">
          <Link to="/login" className="login-link" style={{ color: '#fff' }}>Login</Link>
      </li>
      </ul>
    </nav>
  );
};

export default Navbar;


