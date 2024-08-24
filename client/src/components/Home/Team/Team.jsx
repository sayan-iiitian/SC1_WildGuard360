import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './css/Team.css'; 
import AmitImg from './images/AmitMandhana.jpeg';
import AkashImg from './images/Akash.jpeg';
import SubhankarImg from './images/Subhankar.jpeg';
import PrithwishImg from './images/Prithwish.jpeg';
import AdityaImg from './images/aditya.jpg';
import Navbar from '../navbar';
const teamMembers = [
  {
    name: 'Amit Mandhana',
    role: 'Chief Technical Officer ( CTO ) (Website Developer(backend), AI/ML)',
    githubUrl: 'https://github.com/AmitMandhana',
    linkedinUrl: 'http://www.linkedin.com/in/amit-mandhana',
    image: AmitImg
  },
  {
    name: 'Akash Mondal',
    role: 'Website Designer',
    githubUrl: 'https://github.com/Akash-Mondal2004',
    linkedinUrl: 'https://www.linkedin.com/in/akash-mondal-518641267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: AkashImg,
  },
  {
    name: 'Shubhankar Kumar',
    role: 'Website Developer (Frontend)',
    githubUrl: 'https://github.com/Shubhankarkmr',
    linkedinUrl: 'https://www.linkedin.com/in/shubhankar-kumar-1a4325286/?otpToken=MTMwNDE4ZTUxMTJkYzljMmI3MjgwZmViNDExZmVmYjI4ZmNhZDU0NzkwYWQ4OTYyN2JjZjA2NjY0NjU4NWRmN2ZlZDBkZGU5NDBjY2VjZmYwNGI4ZDBiYTA0OGRhOWU1MGE5ZGY0ZWM2ZTM2NzJkM2ViZjU3YTYzLDEsMQ%3D%3D&midSig=3bR9mKPfZh4bk1&eid=j9t2vg-lxikoy98-an&midToken=AQH1byqxSl4bgQ&trkEmail=eml-email_job_alert_digest_01-header-0-profile_glimmer-null-j9t2vg%7Elxikoy98%7Ean-null-null&trk=eml-email_job_alert_digest_01-header-0-profile_glimmer&originalSubdomain=in',
    image: SubhankarImg,
  },
  {
    name: 'Aditya paul',
    role: 'Website Developer (backend/Api)',
    githubUrl: 'https://github.com/Poseidon120104',
    linkedinUrl: 'https://www.linkedin.com/in/aditya-paul-9754b0234/',
    image: AdityaImg,
  },
  {
    name: 'Prithwish Dey',
    role: 'AI/ML Developer',
    githubUrl: 'https://github.com/prithwish2dey',
    linkedinUrl: 'www.linkedin.com/in/prithwish-dey-9a6267286',
    image: PrithwishImg,
  },
  // Add more team members as needed
];

const TeamMember = ({ name, role, githubUrl, linkedinUrl, image }) => (
  <div className="team-member">
    <img src={image} alt={`${name}'s profile`} className="team-member-image" />
    <h3 className="team-member-name font-bold">{name}</h3>
    <p className="team-member-role">{role}</p>
    <div className="team-member-links">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="team-member-link">
        <FaGithub size={30} />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="team-member-link">
        <FaLinkedin size={30} />
      </a>
    </div>
  </div>
);

const TeamM = () => (
  <div className="team">
    <h1 className="text-6xl font-bold text-orange-500 p-6">Meet Our Team!!</h1>
    <div className="team-members">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  </div>
);

const Team = () => (
  <div>
    <Navbar/>
  <div className="Team">
    <TeamM />
  </div>
  </div>
);

export default Team;

