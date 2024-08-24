from flask import Flask, request, redirect, url_for, render_template, send_from_directory, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

import numpy as np
import os
from PIL import Image
import tensorflow as tf
import cv2
import base64
from fastai.vision.all import PILImage, load_learner
import joblib
import pandas as pd

import torch
import torchvision.transforms as transforms
import torchvision.models as models
import matplotlib.pyplot as plt

from snakes_data import snakes_data
from birds_data import birds_data
from dogs_data import dogs_data
from disease_data import disease_data
from tensorflow.keras.models import load_model
# Define the model architecture

app = Flask(_name_)
CORS(app)
@app.route('/symptoms', methods=['POST'])
def receive_symptoms():
    data = request.json

    symptom_list = data.get('symptomList', [])
    inp = np.array(symptom_list)
    model = tf.keras.models.load_model('./Dog_Symptoms_Model.h5')
    inp = inp.reshape(1, -1)  # Reshape to (1, 85)
    predictions = model.predict(inp)
    predicted_class = np.argmax(predictions, axis=1)
    predicted_disease = disease[predicted_class[0]]
    selected = next(
    (person for person in disease_data if person["disease_name"].lower() == predicted_disease.lower()), 
    None
)
    # Further processing can be done here
    return jsonify(selected)





@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if _name_ == '_main_':
    app.run(debug=True)