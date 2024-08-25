import React, { useEffect } from 'react';
import  banner_image3 from './images/slide3.png';
import  banner_image4 from './images/slide2.png';
import img1 from './images/parrot.jpeg';
import banner_image2 from './images/Lost-Pet-Finder.png';
import Navbar from './navbar';
import './css/home.css';
import Service from './service';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const slides = document.querySelector('.slideshome');
    const totalSlides = slides.children.length;

    const showNextSlide = () => {
      currentIndex++;
      slides.style.transition = 'transform 1s ease';
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Loop back to the first slide seamlessly
      if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
          slides.style.transition = 'none';
          slides.style.transform = 'translateX(0)';
          currentIndex = 0;
          // Force reflow to reset transition
          void slides.offsetWidth;
          slides.style.transition = 'transform 1s ease';
        }, 1000); // This timeout should match the transition duration
      }
    };

    const interval = setInterval(showNextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return<div>
  <Navbar />
  <div className="info">
  <div className="bannerhome">
        <div className="sliderhome">
          <div className="slideshome">
            <div className="slidehome"><img src={banner_image2} alt="Image 1" /></div>
            <div className="slidehome"><img src={banner_image4} alt="Image 2" /></div>
            <div className="slidehome"><img src={img1} alt="Image 3" /></div>
            <div className="slidehome"><img src={banner_image3} alt="Image 4" /></div>
            <div className="slidehome"><img src={banner_image2} alt="Image 4" /></div>
          </div>
        </div>
      </div>
    {/* <img src={img1} alt="Parrot" className="full-width-img" /> */}
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
