import React, { useState } from 'react';
import axios from 'axios';

const DiseaseClassifier = () => {
  const symptoms = ['Fever',
    'Nasal Discharge',
    'Loss of appetite',
    'Weight Loss',
    'Lameness',
    'Breathing Difficulty',
    'Swollen Lymph nodes',
    'Lethargy',
    'Depression',
    'Coughing',
    'Diarrhea',
    'Seizures',
    'Vomiting',
    'Eating less than usual',
    'Excessive Salivation',
    'Redness around Eye area',
    'Severe Dehydration',
    'Pain',
    'Discomfort',
    'Sepsis',
    'WeightLoss',
    'Tender abdomen',
    'Increased drinking and urination',
    'Bloated Stomach',
    'Yellow gums',
    'Constipation',
    'Paralysis',
    'Wrinkled forehead',
    'Continuously erect and stiff ears',
    'Grinning appearance',
    'Stiff and hard tail',
    'Stiffness of muscles',
    'Acute blindness',
    'Blood in urine',
    'Hunger',
    'Cataracts',
    'Losing sight',
    'Glucose in urine',
    'Burping',
    'blood in stools',
    'Passing gases',
    'Eating grass',
    'Scratching',
    'Licking',
    'Itchy skin',
    'Redness of skin',
    'Face rubbing',
    'Loss of Fur',
    'Swelling of gum',
    'Redness of gum',
    'Receding gum',
    'Bleeding of gum',
    'Plaque',
    'Bad breath',
    'Tartar',
    'Lumps',
    'Swelling',
    'Red bumps',
    'Scabs',
    'Irritation',
    'Dry Skin',
    'Fur loss',
    'Red patches',
    'Heart Complication',
    'Weakness',
    'Aggression',
    'Pale gums',
    'Coma',
    'Collapse',
    'Abdominal pain',
    'Difficulty Urinating',
    'Dandruff',
    'Anorexia',
    'Blindness',
    'excess jaw tone',
    'Urine infection',
    'Lack of energy',
    'Smelly',
    'Neurological Disorders',
    'Eye Discharge',
    'Loss of Consciousness',
    'Enlarged Liver',
    'lethargy',
    'Purging',
    'Bloody discharge',
    'Wounds'];;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions = symptoms.filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleSubmit = () => {
    const symptomList = symptoms.map(symptom => selectedSymptoms.includes(symptom) ? 1 : 0);

    // Send the symptomList to the Flask backend
    axios.post('http://localhost:5000/symptoms', { symptomList })
      .then(response => {
        setResponseText(response.data.message); // Display the backend response
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div>
      <h2>Select Symptoms</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type symptom..."
      />
      <div 
        style={{ 
          maxHeight: '100px', 
          overflowY: 'auto', 
          marginTop: '10px', 
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '5px'
        }}
      >
        {suggestions.map((symptom, index) => (
          <div 
            key={index} 
            onClick={() => handleSuggestionClick(symptom)} 
            style={{
              padding: '5px 10px',
              marginBottom: '5px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {symptom}
          </div>
        ))}
      </div>
      <div>
        <h3>Selected Symptoms:</h3>
        <ul>
          {selectedSymptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Submit Symptoms</button>
      
      {responseText && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Predicted Disease:</strong> {responseText}
        </div>
      )}
    </div>
  );
};

export default DiseaseClassifier;