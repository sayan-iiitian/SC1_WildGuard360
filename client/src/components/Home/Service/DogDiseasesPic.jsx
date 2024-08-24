import React, { useState } from 'react';
import axios from 'axios';

function DogDiseasesPic() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://localhost:5000/dogs_classify', formData)
            .then((response) => {
                setMessage(response.data.msg);
                setImageUrl(response.data.imageUrl);
            })
            .catch((error) => {
                setMessage(error.response.data.msg || 'An error occurred');
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {message && <p>{message}</p>}
            {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />}
            <p><a href="/snakeclassification">Upload Another Image</a></p>
        </div>
    );
}

export default DogDiseasesPic;
