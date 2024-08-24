// import React from 'react';
// import './css/service.css';
// import img1 from './images/service1.jpeg';
// import img2 from './images/service5.jpeg';
// import img3 from './images/service6.jpeg';
// import img4 from './images/service4.jpeg';
// import img5 from './images/service7.jpeg';
// import WildlifeNews from './WildlifeNews';
// const Service = () => {
//   return (
//     <div className='service-container'>
//       <h1>OUR SERVICE</h1>
//       <div className='service'>
//         <div className="text-container">
//           <p id="he">Detect Animals  </p>
//           <p>
//           Utilize Wildguard360's cutting-edge technology to detect animals through photo and sound for effective monitoring and protection.
//           </p>
//           <button className="learn-more-btn">Check &rarr;</button>
//         </div>
//         <img src={img1} alt="Animal Detection" />
//       </div>

//       <div className='service reverse'>
//         <div className="text-container">
//           <p id="her">Skin Diseases of Animals</p>
//           <p>
//           Learn about common skin diseases in animals and how Wildguard360 provides diagnosis and treatment to ensure their well-being.
//           </p>
//           <button className="learn-more-btn">Check &rarr;</button>
//         </div>
//         <img src={img4} alt="Bird Sound Detection" />
//       </div>

//       <div className='service'>
//         <div className="text-container">
//           <p id="he">NGO Rescue</p>
//           <p>
//           Partner with Wildguard360's NGO Rescue program to save and rehabilitate vulnerable wildlife through coordinated rescue operations and expert care.
//           </p>
//           <button className="learn-more-btn">Check &rarr;</button>
//         </div>
//         <img src={img2} alt="Snakes Information" />
//       </div>

//       <div className='service reverse'>
//         <div className="text-container">
//           <p id="her"> Find My Missing Pet</p>
//           <p>
//           Locate your lost pet quickly and efficiently with Wildguard360's advanced animal detection and tracking technology.
//           </p>
//           <button className="learn-more-btn">Check &rarr;</button>
//         </div>
//         <img src={img3} alt="Animal Skin Diseases" />
//       </div>
//       <div className='service'>
//         <div className="text-container">
//           <p id="he">Donation</p>
//           <p>
//           Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.
//           </p>
//           <button className="learn-more-btn">Check &rarr;</button>
//         </div>
//         <img src={img5} alt="Snakes Information" />
//       </div>

//       <div className='nature-news-container'>
//       <div className="content">
//         <h1>NATURE NEWS</h1>
//         <div className="box-container">
//           <div className="box box4"></div>
//           <div className="box box-center"><WildlifeNews /></div>
//           <div className="box box3"></div>
//         </div>
//          {/* <img src={img5} alt="Nature Image" className="image-left" />  */}
//       </div>
//     </div>
        
//       </div>
  
//   );
// }

// export default Service;

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/service.css';
import img1 from './images/service1.jpeg';
import img2 from './images/service5.jpeg';
import img3 from './images/service6.jpeg';
import img4 from './images/service4.jpeg';
import img5 from './images/service7.jpeg';
import WildlifeNews from '../../WildlifeNews';
// import MissingPet from './MissingPet';

const Service = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const serviceRefs = useRef([]);

  useEffect(() => {
    const currentRefs = serviceRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <div className='service-container'>
        <h1 className='title'>OUR SERVICE</h1>
        <div className='service-con'>
          {[
            {
              title: 'Detect Animals through Picture',
              description:
                'Detecting animals through pictures involves using software to analyze photos and identify the animals in them. As a user, you upload a photo of an animal into the software, which then quickly analyzes the image to provide accurate identification and naming of the animal.',
              img: img1,
              alt: 'Animal Detection',
              path: './detect',
            },
            {
              title: 'Find My Missing Pet',
              description:
                'Locate your lost pet quickly and efficiently with Wildguard360 s advanced animal detection and tracking technology.',
              img: img3,
              alt: 'Bird Sound Detection',
              reverse: true,
              path:'./MissingPet'
            },
            {
              title: 'NGO Rescue',
              description:
                'Partner with Wildguard360 s NGO Rescue program to save and rehabilitate vulnerable wildlife through coordinated rescue operations and expert care.',
              img: img2,
              alt: 'Snakes Information',
              path:'./'
            },
            {
              title: 'Skin Diseases of Animals',
              description:
                'Detecting skin diseases in animals involves identifying abnormal skin conditions through visual inspection, diagnostic tests, and possibly AI-powered image analysis.',
              img: img4,
              alt: 'Animal Skin Diseases',
              reverse: true,
              path:'./'
            },
            {
              title: 'Donation',
              description:
                'Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.',
              img: img5,
              alt: 'Donation',
              path:'./donation'
            },
          ].map((service, index) => (
            <div
              className={`service ${service.reverse ? 'reverse' : ''}`}
              ref={(el) => (serviceRefs.current[index] = el)}
              key={index}
            >
              <div className="text-container-service">
                <h1 id="he">{service.title}</h1>
                <p>{service.description}</p>
                <button className="learn-more-btn" onClick={() => handleNavigation(service.path)}>Check &rarr;</button>
              </div>
              <div className='imageservice'>
                <img src={service.img} alt={service.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='nature-news-container'>
        <div className="content">
          <h1>NATURE NEWS</h1>
          <div className="box-container">
            {/* <div className="box box4"></div> */}
            <div className="box box-center"><WildlifeNews /></div>
            {/* <div className="box box3"></div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;

