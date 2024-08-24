import React, { useState } from 'react';
import axios from 'axios';

function BirdClassification() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);  // Make sure the key here matches the key in your Flask app

        axios.post('http://localhost:5000/classify', formData)
            .then((response) => {
                setClassName(response.data.msg);
                setImageUrl(response.data.imageUrl);
            })
            .catch((error) => {
                setClassName(error.response.data.msg || 'An error occurred');
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {message && <p>{message}</p>}
            {imageUrl && (
                <div>
                    <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '20px' }} />
                    <p>Predicted Class: {className}</p>
                </div>
            )}
            <p><a href="/birdclassification">Upload Another Image</a></p>
        </div>
    );
}

export default BirdClassification;
