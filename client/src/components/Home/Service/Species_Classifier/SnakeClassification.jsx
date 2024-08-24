import React, { useState, useRef } from 'react';
import axios from 'axios';
import './css/snakeclassification.css';

function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [snakeData, setSnakeData] = useState(null);
    const [activeKey, setActiveKey] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state

    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));  // Set preview URL
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));  // Set preview URL
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setSnakeData(null);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://localhost:5000/upload', formData)
            .then((response) => {
                setSnakeData(response.data);
                setPreviewUrl(null);  // Clear preview after upload
                setSelectedFile(null);  // Clear selected file
            })
            .catch((error) => {
                setSnakeData(null);
                console.error(error.response.data.msg || 'An error occurred');
            });
    };

    const handleButtonClick = (key) => {
        setActiveKey(key);
        setIsPopupVisible(true);  // Show the pop-up when button is clicked
    };

    const handleClick = () => {
        inputRef.current.click();  // Trigger file input when drop area is clicked
    };

    const closePopup = () => {
        setIsPopupVisible(false);  // Hide the pop-up
    };

    return (
        <div className="container">
            <h2>Snake Classification</h2>
            <p>Upload an image of a snake to classify it and learn more about it.</p>

            {!snakeData && (
                <div 
                    className={`drop-area ${dragActive ? 'active' : ''}`} 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}  // Trigger file input on click
                >
                    <p>Drag and drop an image here, or click to select a file</p>
                    <input 
                        id="fileInput" 
                        type="file" 
                        ref={inputRef}  // Attach ref to input
                        onChange={handleFileChange} 
                        style={{ display: 'none' }}  // Keep input hidden
                    />
                </div>
            )}

            {previewUrl && !snakeData && (
                <div className="preview">
                    <h4>Image Preview:</h4>
                    <img src={previewUrl} alt="Selected Preview" className="preview-image" />
                </div>
            )}

            {!snakeData && selectedFile && (
                <button className="upload-btn" onClick={handleUpload}>Upload Image</button>
            )}

            {snakeData && (
                <div className="snake-info">
                    <h3>{snakeData.common_name}</h3>
                    <img src={`http://localhost:5000${snakeData.imageUrl}`} alt="Uploaded Snake" />

                    <div>
                        {Object.keys(snakeData).filter(key => key !== 'common_name' && key !== 'imageUrl').map((key) => (
                            <button
                                key={key}
                                onClick={() => handleButtonClick(key)}
                                className={activeKey === key ? 'active' : ''}
                            >
                                View {key.replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-popup" onClick={closePopup}>&times;</span>
                        {activeKey && snakeData[activeKey] && (
                            <div className="snake-details">
                                <h4>{activeKey.replace(/_/g, ' ')}</h4>
                                {activeKey === 'link' ? (
                                    <a href={snakeData[activeKey]} target="_blank" rel="noopener noreferrer">
                                        {snakeData[activeKey]}
                                    </a>
                                ) : (
                                    <p>{snakeData[activeKey]}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
