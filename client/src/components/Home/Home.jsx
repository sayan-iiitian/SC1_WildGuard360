import React from 'react';
import img1 from './images/parrot.jpeg';
import Navbar from './navbar';
import './css/home.css';
import Service from './service';
const Home = () => {
  return<div>
  <Navbar />
  <div className="info">
    <img src={img1} alt="Parrot" className="full-width-img" />
    <div className="info-text-home">
      <h1 className="heading">“NATURE IS NOT A PLACE TO VISIT, IT IS HOME.<br></br>LET’S PROTECT OUR HOME.”</h1>
      {/* <h1 className="heading">LET’S PROTECT OUR HOME.”</h1> */}
      <p style={{marginBottom:0}} className='info-text'>Technology plays a crucial role in protecting future wildlife. Advanced tracking devices and drones monitor animal movements, while AI and data analytics identify poaching activities and predict environmental threats. Conservation efforts are enhanced through real-time data, enabling proactive measures and fostering a sustainable coexistence between humans and wildlife.</p>
    </div>
    </div> 
    <Service />
  
</div>;
};

export default Home;
