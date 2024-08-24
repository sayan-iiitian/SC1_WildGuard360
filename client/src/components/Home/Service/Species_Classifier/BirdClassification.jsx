import React, { useState } from 'react';
import axios from 'axios';

function BirdClassification() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('');
    const [birdDetails, setBirdDetails] = useState({});
    const [activeDetail, setActiveDetail] = useState('');

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
                setClassName(response.data.common_name);
                setImageUrl(response.data.imageUrl);
                setBirdDetails(response.data);  // Store the full bird details
                setMessage('');  // Clear previous messages
            })
            .catch((error) => {
                setMessage(error.response.data.msg || 'An error occurred');
                setBirdDetails({});
            });
    };

    const handleButtonClick = (detailKey) => {
        setActiveDetail(detailKey);
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
                    
                    {/* Display buttons for each detail */}
                    <div>
                        {Object.keys(birdDetails).map((key) => (
                            key !== 'imageUrl' && key !== 'msg' && key !== 'common_name' ? (
                                <button key={key} onClick={() => handleButtonClick(key)}>
                                    View {key.replace(/_/g, ' ')}
                                </button>
                            ) : null
                        ))}
                    </div>
                    
                    {/* Display the selected detail */}
                    {activeDetail && birdDetails[activeDetail] && (
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                            <h4>{activeDetail.replace(/_/g, ' ')}</h4>
                            {activeDetail === 'references' ? (
                                <ul>
                                    {birdDetails[activeDetail].map((link, index) => (
                                        <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{birdDetails[activeDetail]}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
            <p><a href="/birdclassification">Upload Another Image</a></p>
        </div>
    );
}

export default BirdClassification;
