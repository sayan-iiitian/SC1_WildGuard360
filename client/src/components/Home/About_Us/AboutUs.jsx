import React from 'react';
import Img1 from './images/about2.jpeg';
import Img2 from './images/about1.jpeg';
import Img3 from './images/about3.jpeg';
import Img4 from './images/about4.jpeg';
import Navbar from './navbar';
import './css/about.css'; // Ensure this path is correct or import the correct CSS file

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-[#fafcf7]">
        <div className="About-container">
          <div className="containerabout m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-6/12">
                <img
                  src={Img1}
                  alt="image"
                />
              </div>
              <div className="md:7/12 lg:w-6/12 titleabout">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl heading ">
                  Protecting Wildlife with Innovation and Heart
                </h2>
                <p className="mt-6 text-gray-600">
                At Wildguard360, we are dedicated to the protection and preservation of wildlife through innovative technology and comprehensive services. Our mission is to ensure the safety and well-being of animals by integrating state-of-the-art detection systems, efficient rescue operations, and a robust network of wildlife protection measures.

                </p>
                <p className="mt-4 text-gray-600">
                Our vision is a world where wildlife thrives in harmony with human development. We believe that by leveraging advanced technology and fostering a collaborative approach, we can create sustainable solutions that benefit both animals and humans.
                </p>
              </div>

            </div>

          </div>

          <div className="containerabout m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className=" container1 space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">

              <div className="md:7/12 lg:w-6/12 titleabout">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl heading ">
                  What we Do:
                </h2>
                <p className="mt-6 text-gray-600">
                  <ol className='list-[upper-roman]'>
                    <li>Animal DetectionOur cutting-edge detection systems use a combination of AI, drones, and sensor technology to monitor and track wildlife populations. This allows us to identify and respond to potential threats quickly and accurately.</li>
                    <li>Rescue ServicesWildguard360 operates a dedicated rescue team that is on call 24/7 to respond to emergencies. Whether it's an injured animal or a situation requiring immediate intervention, our experts are equipped to provide rapid and effective assistance</li>
                    <li>Comprehensive CoverageWe offer a wide range of services designed to protect wildlife in various environments. From habitat preservation to anti-poaching initiatives, our efforts are comprehensive and far-reaching.</li>
                    <li>Education and AdvocacyWe believe in the power of education and advocacy to drive change. Through community outreach programs, educational campaigns, and partnerships with local organizations, we strive to raise awareness and promote wildlife conservation.</li>
                  </ol>
                </p>
                {/* <p className="mt-4 text-gray-600">
                      At Paediprime, our mission is to ensure every child receives the best possible care in a nurturing and supportive environment. We understand that a child's smile is a reflection of their well-being, and we strive to make every visit a positive experience. Our team of highly skilled pediatricians and healthcare professionals are committed to delivering personalized care with compassion and expertise.
                      </p> */}
              </div>
              <div className="md:5/12 lg:w-6/12">
                <img
                  src={Img4}
                  alt="image"
                />
              </div>
            </div>

          </div>
          <div className="vision-banner">
            <div className="banner-image">
              <img src={Img2} alt="Image2" />
            </div>
            <div className="vision-text">
              <span className="vision-title">Vision</span>
              <p>To be the kind of leader in the space of child health that <br />India has not witnessed yet, by providing next-generation<br /> premier quality healthcare to children.</p>
            </div>
          </div>
          <div className="mission-banner">

            <div className="mission-text">
            <span className="mission-title">Mission</span> <p>The measure of our success is in<br></br> the number of smiling faces</p></div>
            {/* <div className="mission-text-p">The measure of our success is in<br></br> the number of smiling faces</div> */}
            <div className="mission-image">
              <img src={Img3} alt="Image3" />
            </div>
          </div>
          <div className="whychoose">
            <h1 className='hd'>Join with us</h1>
            <div className="text-about-choose"><p>We invite you to join us in our mission to protect and preserve the world's wildlife. Whether you are a volunteer, a partner organization, or a supporter, your involvement can make a difference. Together, we can create a safer, more sustainable world for all living creatures.</p></div>
          </div>
          <div className="thank-you">Thank you for choosing Wildguard360 .</div>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
