import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MissingPet.css';
import axios from 'axios';

const MissingPet = () => {
  const initialCoords = [22.9638468, 88.5219274];

  const [selectedCoords, setSelectedCoords] = useState(initialCoords);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    petName: '',
    petType: '',
    petAge: '',
    petImage: '',
    description: '',
  });
  const [editingPetId, setEditingPetId] = useState(null);
  const [markers, setMarkers] = useState([]);

  const mainMapRef = useRef(null);
  const inputMapRef = useRef(null);

  useEffect(() => {
    if (!mainMapRef.current && !inputMapRef.current) {
      initializeMap();
    }
    fetchMarkers();

    // Load Cloudinary widget script
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
      setSelectedCoords([e.latlng.lat, e.latlng.lng]);
      inputMarker.setLatLng(e.latlng);
    });
    inputMarker.on('dragend', (e) => {
      setSelectedCoords([e.target.getLatLng().lat, e.target.getLatLng().lng]);
    });
  };

  const fetchMarkers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/location');
      setMarkers(response.data);
      response.data.forEach((report) => {
        const { _id, coordinates, name, phone, petName, petType, petAge, petImage, description } = report;

        const popupContent = `
          <div>
            <h3>${petName}, age ${petAge}</h3>
            <p><strong>Pet Type:</strong> ${petType}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><img src="${petImage}" alt="${petName}" style="width: 100px; height: 100px; object-fit: cover;"></p>
            <p><strong>Contact:</strong> ${name} at <a href="tel:${phone}">${phone}</a></p>
            <button class="edit-btn" data-id="${_id}">Edit</button>
            <button class="delete-btn" data-id="${_id}">Delete</button>
          </div>
        `;

        const marker = L.marker(coordinates).addTo(mainMapRef.current);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
        await axios.put('http://localhost:4000/api/pets/${editingPetId}', petData);
        setEditingPetId(null);
      } else {
        await axios.post('http://localhost:4000/api/pets', petData);
      }

      fetchMarkers();
      setFormData({ name: '', phone: '', petName: '', petType: '', petAge: '', petImage: '', description: '' });
    } catch (error) {
      console.error('Error submitting/editing pet report:', error);
    }
  };

  const handleEdit = (id) => {
    const petToEdit = markers.find(marker => marker._id === id);
    setFormData({
      name: petToEdit.name,
      phone: petToEdit.phone,
      petName: petToEdit.petName,
      petType: petToEdit.petType,
      petAge: petToEdit.petAge,
      petImage: petToEdit.petImage,
      description: petToEdit.description,
    });
    setSelectedCoords(petToEdit.coordinates);
    setEditingPetId(id);
  };

  const handleDelete = async (id, marker) => {
    try {
      await axios.delete('http://localhost:4000/api/pets/${id}');
      mainMapRef.current.removeLayer(marker);
      fetchMarkers();
    } catch (error) {
      console.error('Error deleting pet report:', error);
    }
  };

  return (
    <div className="containermisspet mb-5">
      <div className="jumbotron">
        <h1 className="display-4">Lost Pet Finder</h1>
        <p className="lead">Locate Lost Pets Nearby!</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div id="main-map" style={{ height: '500px', width: '100%' }}></div>
        </div>
        <div className="col-md-6">
          <h2>Submit Your Pet Report</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Your Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="petName">Pet's Name</label>
              <input
                type="text"
                className="form-control"
                id="petName"
                value={formData.petName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="petType">Pet's Type</label>
              <input
                type="text"
                className="form-control"
                id="petType"
                value={formData.petType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="petAge">Pet's Age</label>
              <input
                type="number"
                className="form-control"
                id="petAge"
                value={formData.petAge}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Pet Description</label>
              <textarea
                className="form-control"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="petImage">Pet's Image</label>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleImageUpload}
              >
                Upload Image
              </button>
              {formData.petImage && (
                <div>
                  <img
                    src={formData.petImage}
                    alt="Pet"
                    style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>
            <div id="map-input" style={{ height: '200px', width: '100%', marginBottom: '20px' }}></div>
            <button type="submit" className="btn btn-success btn-block">
              {editingPetId ? 'Update Pet Report' : 'Submit Pet Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MissingPet;