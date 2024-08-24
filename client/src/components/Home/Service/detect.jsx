import React from 'react';
import img2 from './images/service2.jpeg';
import img3 from './images/service3.jpeg';
import img4 from './images/detect2.jpeg';
import Navbar from '../navbar';
import './css/detect.css';

const DetectAnimals = () => {
  return (
    <div>
      <Navbar />
      <div className="detect-container">
        <div className="box3">
          <img src={img2} alt="Wildlife" className="wildlife-image" />
          <div className="text">
            <h1 id="box-head">Detect Birds through Picture</h1>
            <button className="learn-more-btn">Check &rarr;</button>
          </div>
        </div>
        <div className="box4">
          <img src={img4} alt="Wildlife" className="wildlife" />
          <div className="text">
            <h1 id="box-head">Detect Bird with Sound</h1>
            <button className="learn-more-btn">Check &rarr;</button>
          </div>
        </div>
        <div className="box5">
          <img src={img3} alt="Wildlife" className="wildlife-image" />
          <div className="text">
            <h1 id="box-head">Know More about Snakes</h1>
            <button className="learn-more-btn">Check &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetectAnimals;