// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Team from './components/Home/Team/Team';
import ContactUs from './components/Home/Contact_Us/ContactUs';
import Service from './components/Home/Service/service';
import DetectAnimals from './components/Home/Service/detect';
import Login from './components/Authorization/Login';
import Donation from './components/donation'; // Ensure this component exists
import Certificate from './components/donation/Certificate';
import Signup from './components/Authorization/Signup'; // Ensure this component exists
import './App.css'; // Import the CSS file for App component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/detect" element={<DetectAnimals />} />
        <Route path="/Certificate" element={<Certificate />} />
        <Route path="/createUser" element={<Signup />} /> {/* Ensure this path matches the link */}
      </Routes>
    </Router>
  );
};

export default App;
