
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/service.css';
import img1 from './images/service1.jpeg';
import img2 from './images/service5.jpeg';
import img3 from './images/service6.jpeg';
import img4 from './images/service4.jpeg';
import img5 from './images/service7.jpeg';
import img6 from './images/Keelback-img.webp';
import img7 from './images/bird.avif';
import img8 from './images/vets.webp';
import img9 from './images/chatbox.avif';
import img10 from './images/disease1.jpg';
import img11 from './images/disease2.avif';
import WildlifeNews from './WildlifeNews';
import Footer from './Footer/footer';

const Service = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      window.location.href = path; // For external links
    } else {
      navigate(path); // For internal links
    }
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
        
        <div className='service-con'>
          <h1 className='title'>OUR SERVICE</h1>
          {
            
          [
            
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
              path:'./mgo'
            },
            {
              title: 'Donation',
              description:
                'Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.',
              img: img5,
              alt: 'Donation',
              reverse: true,
              path:'./donation'
            },
            {
              title: 'Skin Diseases of Animals',
              description:
                'Detecting skin diseases in animals involves identifying abnormal skin conditions through visual inspection, diagnostic tests, and possibly AI-powered image analysis.',
              img: img4,
              alt: 'Animal Skin Diseases',
              // reverse: true,
              path:'./'
            },
            
            {
              title: 'Snake Classifier',
              description:
                'Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.',
              img: img6,
              reverse:true,
              alt: 'Snake Classifier',
              path:'./snakeclassification'
            },
            {
              title: 'Nearest Vets',
              description:
                'Find the nearest animal hospitals and vets quickly with Wildguard360’s location-based services.',
              img: img8,
              // reverse:true,
              alt: 'Nearest Vets',
              path:'https://www.google.com/maps/search/animal+hospitals/@${position.coords.latitude},${position.coords.longitude},12z/data=!3m1!4b1!4m2!2m1!6e2' // External link
            },
            {
              title: 'Disease Classification(using Symptoms)',
              description:
                'Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.',
              img: img11,
              reverse: true,
              alt: 'Disease Classifier',
              path:'./DiseaseClassifier'
            },
            {
              title: 'Bird Classification',
              description:
                'Support our mission in protecting wildlife by donating to Wildguard360, where every contribution helps us rescue, rehabilitate, and preserve endangered species.',
              img: img7,
              alt: 'Bird CLassifier',
              path:'./birdclassification'
            },
            {
              title: 'Disease Classifier(Using Pics)',
              description:
                'Find the nearest animal hospitals and vets quickly with Wildguard360’s location-based services.',
              img: img10,
              reverse:true,
              alt: 'DogDiseasesPic',
              path:'./DogDiseasesPic' // External link
            }
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
      <div className='nature-news-container bg-[#F9F7F2]'>
        <div className="content">
          <h1>NATURE NEWS</h1>
          <div className="box-container">
            <div className="box box-center"><WildlifeNews /></div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Service;
