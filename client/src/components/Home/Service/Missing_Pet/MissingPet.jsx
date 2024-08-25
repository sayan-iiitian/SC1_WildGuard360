
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MissingPet.css';
import axios from 'axios';

const MissingPet = () => {
  const initialCoords = [22.9638468, 88.5219274]; // Initial coordinates

  const [selectedCoords, setSelectedCoords] = useState(initialCoords);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    petName: '',
    petType: '',
    petAge: '',
    email: '',
    petImage: '',
    description: '',
    status: 'Lost', // Default status is 'Lost'
  });
  const [editingPetId, setEditingPetId] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(0);

  const mainMapRef = useRef(null);
  const inputMapRef = useRef(null);

  useEffect(() => {
    if (!mainMapRef.current && !inputMapRef.current) {
      initializeMap();
    }
    fetchMarkers();

    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.onload = () => {
      console.log('Cloudinary script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Cloudinary script');
    };
    document.body.appendChild(script);
  }, []);

  const initializeMap = () => {
    mainMapRef.current = L.map('main-map').setView(initialCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mainMapRef.current);

    inputMapRef.current = L.map('map-input').setView(initialCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(inputMapRef.current);

    const inputMarker = L.marker(initialCoords, { draggable: true }).addTo(inputMapRef.current);
    inputMapRef.current.on('click', (e) => {
      const newCoords = [e.latlng.lat, e.latlng.lng];
      setSelectedCoords(newCoords);
      inputMarker.setLatLng(e.latlng);
      calculateDistance(newCoords);
    });
    inputMarker.on('dragend', (e) => {
      const newCoords = [e.target.getLatLng().lat, e.target.getLatLng().lng];
      setSelectedCoords(newCoords);
      calculateDistance(newCoords);
    });
  };

  const fetchMarkers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/location');
      setMarkers(response.data);
      response.data.forEach((report) => {
        const { _id, coordinates, name, phone, email, petName, petType, petAge, petImage, description, status } = report;

        const markerColor = status === 'Found' ? 'red' : 'blue';
        const marker = L.circleMarker(coordinates, { color: markerColor }).addTo(mainMapRef.current);
        const distanceFromInitial = calculateDistance(coordinates);

        const popupContent = `
          <div>
            <h3>${petName ? petName + ', age ' + petAge : ''}</h3>
            <p><strong>Pet Type:</strong> ${petType}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><img src="${petImage}" alt="${petName || 'Pet'}" style="width: 100px; height: 100px; object-fit: cover;"></p>
            <p><strong>Status:</strong> <span style="color: ${status === 'Found' ? 'red' : 'black'};">${status}</span></p>
            <p><strong>Contact:</strong> ${name} at <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email} </a></p>
            <p><strong>Distance from Initial Location:</strong> ${distanceFromInitial} km</p>
            <button class="edit-btn" data-id="${_id}">Edit</button>
            <button class="delete-btn" data-id="${_id}">Delete</button>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          document.querySelector('.edit-btn').addEventListener('click', () => handleEdit(_id));
          document.querySelector('.delete-btn').addEventListener('click', () => handleDelete(_id, marker));
        });
      });
    } catch (error) {
      console.error('Error fetching marker data:', error);
    }
  };

  // const calculateDistance = (coords) => {
  //   const toRad = (value) => (value * Math.PI) / 180;
  //   const R = 6371; // Radius of the Earth in kilometers

  //   const lat1 = toRad(initialCoords[0]);
  //   const lon1 = toRad(initialCoords[1]);
  //   const lat2 = toRad(coords[0]);
  //   const lon2 = toRad(coords[1]);

  //   const dLat = lat2 - lat1;
  //   const dLon = toRad(coords[1]) - lon1;

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //   const distance = R * c;
  //   return distance.toFixed(2); // Return distance with 2 decimal places
  // };
  const calculateDistance = (coords) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
  
    const lat1 = toRad(initialCoords[0]);
    const lon1 = toRad(initialCoords[1]);
    const lat2 = toRad(coords[0]);
    const lon2 = toRad(coords[1]);
  
    const dLat = lat2 - lat1;
    const dLon = toRad(coords[1]) - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    const distanceKm = distance.toFixed(2); // Return distance with 2 decimal places
  
    // Trigger an email if distance is less than 1 km
    if (distance < 1) {
      sendNearbyNotification(distanceKm);
    }
  
    return distanceKm;
  };
  
  const sendNearbyNotification = async (distance) => {
    try {
      const response = await axios.post('http://localhost:4000/api/notify', {
        email: formData.email,
        petName: formData.petName,
        distance: distance,
      });
      console.log('Notification sent:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: value,
      petName: value === 'Found' ? '' : prevData.petName, // Clear petName if status is Found
      petAge: value === 'Found' ? '' : prevData.petAge,   // Clear petAge if status is Found
    }));
  };

  const handleImageUpload = () => {
    const widgetOptions = {
      cloudName: 'dxfipuy9u',
      uploadPreset: 'Paul_updated_frontend',
      sources: ['local', 'url', 'camera'],
      cropping: false,
      multiple: false,
      transformation: [{ width: 100, height: 100, crop: 'limit' }],
    };

    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(widgetOptions, (error, result) => {
        if (!error && result && result.event === 'success') {
          setFormData((prevData) => ({
            ...prevData,
            petImage: result.info.secure_url,
          }));
        }
      });
    } else {
      console.error('Cloudinary script is not loaded yet');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      ...formData,
      coordinates: selectedCoords,
    };

    try {
      if (editingPetId) {
        await axios.put(`http://localhost:4000/api/pets/${editingPetId}`, petData);
        setEditingPetId(null);
      } else {
        await axios.post('http://localhost:4000/api/pets', petData);
      }

      fetchMarkers();
      setFormData({ name: '', phone: '', email: '', petName: '', petType: '', petAge: '', petImage: '', description: '', status: 'Lost' }); // Reset all fields including status
      setDistance(0); // Reset distance after submission
    } catch (error) {
      console.error('Error submitting/editing pet report:', error);
    }
  };

  const handleEdit = (id) => {
    const petToEdit = markers.find(marker => marker._id === id);
    setFormData({
      name: petToEdit.name,
      phone: petToEdit.phone,
      email: petToEdit.email,
      petName: petToEdit.petName,
      petType: petToEdit.petType,
      petAge: petToEdit.petAge,
      petImage: petToEdit.petImage,
      description: petToEdit.description,
      status: petToEdit.status, // Set status for editing
    });
    setSelectedCoords(petToEdit.coordinates);
    setEditingPetId(id);
    setDistance(calculateDistance(petToEdit.coordinates));
  };

  const handleDelete = async (id, marker) => {
    try {
      await axios.delete(`http://localhost:4000/api/pets/${id}`);
      mainMapRef.current.removeLayer(marker);
      fetchMarkers();
    } catch (error) {
      console.error('Error deleting pet report:', error);
    }
  };

  return (
    <div className="mainmissing">
    <div className="containermisspet mb-5">
      <div className="jumbotron">
        <h1 className="display-4">Lost Pet Finder</h1>
        <p className="lead">Report a lost or found pet and help others find them.</p>
      </div>

      <div id="main-map" style={{ height: '400px' }}></div>

      <div className="container mt-4">
  <h2>{editingPetId ? 'Edit Pet Report' : 'Submit New Pet Report'}</h2>
  <div className="form-map-container">
    <div className="smallmap"><p>Place the pin where you lost your pet.</p><div id="map-input" className="map-container"></div></div>
    
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleStatusChange}
          className="form-control"
          required
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Your Phone Number</label>
        <input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Your Email Address</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      {formData.status === 'Lost' && (
        <>
          <div className="form-group">
            <label htmlFor="petName">Pet Name</label>
            <input
              type="text"
              id="petName"
              value={formData.petName}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="petAge">Pet Age</label>
            <input
              type="text"
              id="petAge"
              value={formData.petAge}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="petType">Pet Type</label>
        <input
          type="text"
          id="petType"
          value={formData.petType}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-control"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Pet Image</label>
        <button type="button" onClick={handleImageUpload} className="btn btn-primary">Upload Image</button>
        {formData.petImage && <img src={formData.petImage} alt="Pet" className="img-thumbnail mt-2" style={{ width: '100px' }} />}
      </div>

      <button type="submit" className="btn btn-success">
        {editingPetId ? 'Update Report' : 'Submit Report'}
      </button>
    </form>
  </div>
  </div>
  </div>
  </div>
  );
};

export default MissingPet;

