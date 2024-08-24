import React, { useState } from 'react';
import axios from 'axios';

function DogDiseasesPic() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [diseaseName, setDiseaseName] = useState('');
    const [message, setMessage] = useState('');
    const [diseaseInfo, setDiseaseInfo] = useState({});
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

        axios.post('http://localhost:5000/dogs_classify', formData)
            .then((response) => {
                setDiseaseName(response.data.disease_name);
                setImageUrl(response.data.imageUrl);
                setDiseaseInfo(response.data);  // Store the full disease details
                setMessage('');  // Clear previous messages
            })
            .catch((error) => {
                setMessage(error.response.data.msg || 'An error occurred');
                setDiseaseInfo({});
            });
    };

    const handleButtonClick = (detailKey) => {
        setActiveDetail(detailKey);
    };

    // Define the list of details to display
    const detailsList = [
        "Disease Description",
        "Severity and Urgency Analysis",
        "Treatment Options",
        "Prevention Tips",
        "Reference Link"
    ];

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {message && <p>{message}</p>}
            {imageUrl && (
                <div>
                    <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '20px' }} />
                    <h3>Disease Name: {diseaseName}</h3>
                    
                    {/* Display buttons for each detail */}
                    <div>
                        {detailsList.map((detail) => (
                            <button
                                key={detail}
                                onClick={() => handleButtonClick(detail)}
                                style={{ margin: '5px' }}
                            >
                                View {detail}
                            </button>
                        ))}
                    </div>
                    
                    {/* Display the selected detail */}
                    {activeDetail && diseaseInfo[activeDetail] && (
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                            <h4>{activeDetail}</h4>
                            {activeDetail === 'Reference Link' ? (
                                <a href={diseaseInfo[activeDetail]} target="_blank" rel="noopener noreferrer">
                                    {diseaseInfo[activeDetail]}
                                </a>
                            ) : (
                                <p>{diseaseInfo[activeDetail]}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
            <p><a href="/dogdiseaseclassification">Upload Another Image</a></p>
        </div>
    );
}

export default DogDiseasesPic;
