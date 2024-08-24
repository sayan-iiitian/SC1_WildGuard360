import React from 'react';
import img1 from './images/about2.jpeg';
import img2 from './images/about1.jpeg'; 
import img3 from './images/about3.jpeg'; 
import img4 from './images/about4.jpeg'; 
import Navbar from './navbar';
import './css/about.css'; // Ensure this path is correct or import the correct CSS file

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <img src={img1} alt="Bird Sound Detection" id="i1" />
        <div className="text-container">
          <p id="her">Protecting Wildlife with Innovation and Heart</p>
          <p>
            At Wildguard360, we are dedicated to the protection and preservation of wildlife through innovative technology and comprehensive services. Our mission is to ensure the safety and well-being of animals by integrating state-of-the-art detection systems, efficient rescue operations, and a robust network of wildlife protection measures.
          </p>
          <p>
            Our vision is a world where wildlife thrives in harmony with human development. We believe that by leveraging advanced technology and fostering a collaborative approach, we can create sustainable solutions that benefit both animals and humans.
          </p>
        </div>
      </div>

      <div className="about-container reverse">
        <img src={img2} alt="Innovative Wildlife Conservation" id="i2" />
        <div className="text-container">
          <p id="her">What We Do:</p>
           <h2>1. Animal Detection</h2>
           <p>Our cutting-edge detection systems use a combination of AI, drones, and sensor technology to monitor and track wildlife populations. This allows us to identify and respond to potential threats quickly and accurately.</p>
           <h2>2. Rescue Services</h2>
           <p>Wildguard360 operates a dedicated rescue team that is on call 24/7 to respond to emergencies. Whether it's an injured animal or a situation requiring immediate intervention, our experts are equipped to provide rapid and effective assistance.</p>
           <h2>3. Comprehensive Coverage</h2>
           <p>We offer a wide range of services designed to protect wildlife in various environments. From habitat preservation to anti-poaching initiatives, our efforts are comprehensive and far-reaching.</p>
           <h2>4. Education and Advocacy</h2>
           <p>We believe in the power of education and advocacy to drive change. Through community outreach programs, educational campaigns, and partnerships with local organizations, we strive to raise awareness and promote wildlife conservation.</p>
           <div className='circle'></div>
        </div>
      </div>
      <div className="commitment-container">
  <h1>Our Commitment</h1>
  <p>
    At Wildguard360, our commitment to wildlife protection is unwavering. We are constantly innovating and adapting to meet the challenges of modern conservation. Our team of passionate professionals is dedicated to making a positive impact and ensuring a safe future for wildlife.
  </p>
  <div className="box1">
    <img src={img3} alt="Wildlife" className="wildlife-image" />
    <div className="text">
      <h1 id="box-head">Vision</h1>
      <p>
        A future where wildlife flourishes safely, supported by cutting-edge technology and collaborative conservation.
      </p>
    </div>
  </div>
  <div className="box2">
    <img src={img4} alt="Wildlife" className="wildlife" />
    <div className="text">
      <h1 id="box-head">Mission</h1>
      <p>
        Protecting wildlife with advanced detection, efficient rescue, and comprehensive conservation initiatives.
      </p>
    </div>
  </div>
</div>
<div className='footer'><h1>Join Us</h1>
<p>We invite you to join us in our mission to protect and preserve the world's wildlife. Whether you are a volunteer, a partner organization, or a supporter, your involvement can make a difference. Together, we can create a safer, more sustainable world for all living creatures.
<div className='line'></div>
  <h2 > Thank you for choosing Wildguard360 .</h2>
</p>

</div>

</div>
  );
}

export default AboutUs;
