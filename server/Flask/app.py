# # import pickle
# # from flask import Flask, request, jsonify
# # import numpy as np
# # import joblib
# # from flask_cors import CORS
# # from flask import Flask, request, render_template, redirect, url_for
# # from werkzeug.utils import secure_filename
# # import numpy as np
# # import os
# # from PIL import Image
# # import tensorflow as tf
# # import cv2
# # import base64

# # app = Flask(__name__)

# # # Allow CORS for all domains on all routes
# # CORS(app)


# # app.config['UPLOAD_FOLDER'] = 'uploads/'
# # app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}

# # # Load the model
# # try:
# #     model = tf.saved_model.load('./input/model/Resnet50')
# # except Exception as e:
# #     print(f"Error loading model: {e}")
# #     exit(1)

# # # Define the class labels
# # classes = [
# #     "agkistrodon-contortrix", "agkistrodon-piscivorus", "coluber-constrictor",
# #     "crotalus-atrox", "crotalus-horridus", "crotalus-ruber", "crotalus-scutulatus",
# #     "crotalus-viridis", "diadophis-punctatus", "haldea-striatula", "heterodon-platirhinos",
# #     "lampropeltis-californiae", "lampropeltis-triangulum", "masticophis-flagellum",
# #     "natrix-natrix", "nerodia-erythrogaster", "nerodia-fasciata", "nerodia-rhombifer",
# #     "nerodia-sipedon", "opheodrys-aestivus", "pantherophis-alleghaniensis",
# #     "pantherophis-emoryi", "pantherophis-guttatus", "pantherophis-obsoletus",
# #     "pantherophis-spiloides", "pantherophis-vulpinus", "pituophis-catenifer",
# #     "rhinocheilus-lecontei", "storeria-dekayi", "storeria-occipitomaculata",
# #     "thamnophis-elegans", "thamnophis-marcianus", "thamnophis-proximus",
# #     "thamnophis-radix", "thamnophis-sirtalis"
# # ]

# # def allowed_file(filename):
# #     return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# # def preprocess_image(image_path):
# #     image = Image.open(image_path).convert('RGB')
# #     image = image.resize((300, 300 * image.size[1] // image.size[0]), Image.LANCZOS)
# #     image = np.array(image)[None]
# #     image = tf.constant(image, dtype='float32')
# #     return image

# # def classify_snake(image_path):
# #     try:
# #         image = preprocess_image(image_path)
# #         predictions = model(image)[0].numpy()
# #         predicted_class_index = np.argmax(predictions)
# #         predicted_class_label = classes[predicted_class_index]
# #         return predicted_class_label
# #     except Exception as e:
# #         print(f"Error in classification: {e}")
# #         return "Error in classification"

# # def image_to_base64(image_path):
# #     try:
# #         image = cv2.imread(image_path)
# #         #image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
# #         _, buffer = cv2.imencode('.jpg', image)
# #         img_base64 = base64.b64encode(buffer).decode('utf-8')
# #         return img_base64
# #     except Exception as e:
# #         print(f"Error converting image to base64: {e}")
# #         return ""

# # @app.route('/snakeClassifier', methods=['POST'])
# # def upload_file():
# #     if 'file' not in request.files:
# #         return redirect(request.url)
# #     file = request.files['file']
# #     if file.filename == '':
# #         return redirect(request.url)
# #     if file and allowed_file(file.filename):
# #         filename = secure_filename(file.filename)
# #         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
# #         try:
# #             file.save(file_path)
# #             predicted_class = classify_snake(file_path)
# #             img_base64 = image_to_base64(file_path)
# #             return render_template('result.html', image_data=img_base64, class_name=predicted_class)
# #         except Exception as e:
# #             print(f"Error during file processing: {e}")
# #             return redirect(request.url)
# #     return redirect(request.url)

# # if __name__ == '__main__':
# #     if not os.path.exists(app.config['UPLOAD_FOLDER']):
# #         os.makedirs(app.config['UPLOAD_FOLDER'])
# #     try:
# #         app.run(debug=True)
# #     except Exception as e:
# #         print(f"Error running the app: {e}")

# # # # Load the trained model from the joblib file
# # # model = joblib.load('knn_model.joblib')

# # # @app.route('/predict', methods=['POST'])
# # # def predict():
# # #     data = request.get_json()
    
# # #     try:
# # #         # Extract features from the request JSON data
# # #         latitude = float(data['latitude'])
# # #         longitude = float(data['longitude'])
# # #         brightness = float(data['brightness'])
# # #         scan = float(data['scan'])
# # #         track = float(data['track'])
# # #         acq_time = float(data['acq_time'])
# # #         confidence = float(data['confidence'])
# # #         bright_t31 = float(data['bright_t31'])
# # #         frp = float(data['frp'])
        
# # #         # Create a feature array based on the input data
# # #         features = np.array([[latitude, longitude, brightness, scan, track, acq_time, confidence, bright_t31, frp]])
        
# # #         # Use the loaded model to make a prediction
# # #         prediction = model.predict(features)[0]
        
# # #         # Simulate fire probability for demonstration
# # #         fire_probability = 90.0  # This should be replaced with your actual calculation
        
# # #         # Return the prediction as JSON response
# # #         return jsonify({'prediction': int(prediction), 'fire_probability': fire_probability})
    
# # #     except Exception as e:
# # #         # Handle any errors that occur
# # #         return jsonify({'error': str(e)}), 400

# # # if __name__ == '__main__':
# # #     app.run(debug=True)
# from flask import Flask, request, jsonify, render_template
# from werkzeug.utils import secure_filename
# from flask_cors import CORS
# import os
# import numpy as np
# import tensorflow as tf
# from PIL import Image
# import base64
# import cv2

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# app.config['UPLOAD_FOLDER'] = 'uploads/'
# app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}

# # Load the model
# try:
#     model = tf.saved_model.load('./input/model/Resnet50')
# except Exception as e:
#     print(f"Error loading model: {e}")
#     exit(1)

# # Define the class labels
# classes = [
#     "agkistrodon-contortrix", "agkistrodon-piscivorus", "coluber-constrictor",
#     "crotalus-atrox", "crotalus-horridus", "crotalus-ruber", "crotalus-scutulatus",
#     "crotalus-viridis", "diadophis-punctatus", "haldea-striatula", "heterodon-platirhinos",
#     "lampropeltis-californiae", "lampropeltis-triangulum", "masticophis-flagellum",
#     "natrix-natrix", "nerodia-erythrogaster", "nerodia-fasciata", "nerodia-rhombifer",
#     "nerodia-sipedon", "opheodrys-aestivus", "pantherophis-alleghaniensis",
#     "pantherophis-emoryi", "pantherophis-guttatus", "pantherophis-obsoletus",
#     "pantherophis-spiloides", "pantherophis-vulpinus", "pituophis-catenifer",
#     "rhinocheilus-lecontei", "storeria-dekayi", "storeria-occipitomaculata",
#     "thamnophis-elegans", "thamnophis-marcianus", "thamnophis-proximus",
#     "thamnophis-radix", "thamnophis-sirtalis"
# ]

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# def preprocess_image(image_path):
#     image = Image.open(image_path).convert('RGB')
#     image = image.resize((300, 300 * image.size[1] // image.size[0]), Image.LANCZOS)
#     image = np.array(image)[None]
#     image = tf.constant(image, dtype='float32')
#     return image

# def classify_snake(image_path):
#     try:
#         image = preprocess_image(image_path)
#         predictions = model(image)[0].numpy()
#         predicted_class_index = np.argmax(predictions)
#         predicted_class_label = classes[predicted_class_index]
#         return predicted_class_label
#     except Exception as e:
#         print(f"Error in classification: {e}")
#         return "Error in classification"

# def image_to_base64(image_path):
#     try:
#         image = cv2.imread(image_path)
#         _, buffer = cv2.imencode('.jpg', image)
#         img_base64 = base64.b64encode(buffer).decode('utf-8')
#         return img_base64
#     except Exception as e:
#         print(f"Error converting image to base64: {e}")
#         return ""

# @app.route('/snakeClassifier', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file provided'}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         try:
#             file.save(file_path)
#             predicted_class = classify_snake(file_path)
#             img_base64 = image_to_base64(file_path)
#             return render_template('result.html', image_data=img_base64, class_name=predicted_class)
#         except Exception as e:
#             print(f"Error during file processing: {e}")
#             return jsonify({'error': 'Error processing file'}), 500
#     return jsonify({'error': 'Invalid file type'}), 400

# if __name__ == '__main__':
#     if not os.path.exists(app.config['UPLOAD_FOLDER']):
#         os.makedirs(app.config['UPLOAD_FOLDER'])
#     app.run(debug=True)
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

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

try:
    model = tf.saved_model.load('./input/model/Resnet50')
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)
try:
    # Adjust the path and map_location if needed
    model_bird = torch.load('./bird_prediction.pkl', map_location=torch.device('cpu'))
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

# model_bird = torch.load('./models/bird_classification_model_big.pth')
# model_bird.eval()

# Define the class labels
classes = [
    "agkistrodon-contortrix", "agkistrodon-piscivorus", "coluber-constrictor",
    "crotalus-atrox", "crotalus-horridus", "crotalus-ruber", "crotalus-scutulatus",
    "crotalus-viridis", "diadophis-punctatus", "haldea-striatula", "heterodon-platirhinos",
    "lampropeltis-californiae", "lampropeltis-triangulum", "masticophis-flagellum",
    "natrix-natrix", "nerodia-erythrogaster", "nerodia-fasciata", "nerodia-rhombifer",
    "nerodia-sipedon", "opheodrys-aestivus", "pantherophis-alleghaniensis",
    "pantherophis-emoryi", "pantherophis-guttatus", "pantherophis-obsoletus",
    "pantherophis-spiloides", "pantherophis-vulpinus", "pituophis-catenifer",
    "rhinocheilus-lecontei", "storeria-dekayi", "storeria-occipitomaculata",
    "thamnophis-elegans", "thamnophis-marcianus", "thamnophis-proximus",
    "thamnophis-radix", "thamnophis-sirtalis"
]

disease=['Tick fever', 'Distemper', 'Parvovirus',
       'Hepatitis', 'Tetanus', 'Chronic kidney Disease', 'Diabetes',
       'Gastrointestinal Disease', 'Allergies', 'Gingitivis', 'Cancers',
       'Skin Rashes']
model_dog = tf.keras.models.load_model('./Dog_Skin_Diseases_Model.h5')
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((300, 300 * image.size[1] // image.size[0]), Image.LANCZOS)
    image = np.array(image)[None]
    image = tf.constant(image, dtype='float32')
    return image

def classify_snake(image_path):
    try:
        image = preprocess_image(image_path)
        predictions = model(image)[0].numpy()
        predicted_class_index = np.argmax(predictions)
        predicted_class_label = classes[predicted_class_index]
        return predicted_class_label
    except Exception as e:
        print(f"Error in classification: {e}")
        return "Error in classification"

def image_to_base64(image_path):
    try:
        image = cv2.imread(image_path)
        #image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        _, buffer = cv2.imencode('.jpg', image)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        return img_base64
    except Exception as e:
        print(f"Error converting image to base64: {e}")
        return ""

def transform_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image = Image.open(image_path).convert('RGB')
    return transform(image).unsqueeze(0)

def classify_bird(image_path):
    try:
        # Load and preprocess the image
        img = PILImage.create(image_path)
        # Make prediction
        predictions = model_bird.predict(img)
        predicted_class = predictions[0]  # Class name
        # predicted_probs = predictions[2]  # Class probabilities
        return predicted_class
    except Exception as e:
        print(f"Error in classification: {e}")
        return "Error in classification"
    
def predict_image(image_upload, model = model_dog):
  im = image_upload
  im_array = np.asarray(im)
  im_array = im_array*(1.0/225.)
  im_input = tf.reshape(im_array, shape = [1, 150, 150, 3])

  predict_array = model.predict(im_input)[0]

  import pandas as pd
  df = pd.DataFrame(predict_array)
  df = df.rename({0:'Probability'}, axis = 'columns')
  prod = ['Flea Allergy', 'Hotspot', 'Mange', 'Ringworm']
  df['Animal'] = prod
  df = df[['Animal', 'Probability']]

  predict_label = np.argmax(model.predict(im_input))

  if predict_label == 0:
      predict_product = 'flea allergy'
  elif predict_label == 1:
      predict_product = 'hotspot'
  elif predict_label == 2:
      predict_product = 'mange'
  else:
      predict_product = 'ringworm'

  return predict_product, df


non_ven = """
1. Remain calm and reassure the patient, since nearly 70% of bites are by nonvenomous snakes or are dry bites.

2. Immobilize the bitten limb by splinting the whole length of the limb using a stick or similar hard object; the splinting bandage should not be tight. Muscular contraction or movement of the bitten part hastens absorption of the venom. The bandage should be promptly tied so that a finger can go through the bandage. Don't apply a tourniquet, it worsens the swelling of the wound with local tissue damage.

3. Lay the patient prone with their head turned to the left to protect the airway. Remove shoes, watches, rings, etc., and loosen clothes. Immediately shift the patient to the nearest hospital with ASV treatment facility.

4. Make sure that the patient doesn't panic and stays calm by reassurance because an increased heart rate hastens the absorption of venom.

5. Don't administer any sedative or alcohol to calm the patient.

6. Don't wash the wound with antiseptics or any chemical. You may only use water. Don't apply ice, heat, spirit, sanitizer, antiseptics, or any other chemicals to the wound.

7. Don't cut, suck, or disturb the wound.
"""

ven = """
1. Shouldn't be administered until a clear indication of envenomation is confirmed.
2. No trial/test dose is permissible before confirmation of envenomation.
3. Local application/injections at the site of the bite are painful and don't improve outcomes, so they are prohibited.
4. Intramuscular injection is prohibited as its absorption is slow and erratic.
"""




@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        predicted_class = classify_snake(file_path)
        img_base64 = image_to_base64(file_path)
        selected = next(
    (person for person in snakes_data if person["scientific_name"].lower() == predicted_class.lower()), 
    None
)

        selected['imageUrl'] =  url_for('uploaded_file', filename=filename)
        if(selected["venomous"] == "Non-venomous"):
            selected['pre-hospital_measures'] = non_ven
        else:
            selected['pre-hospital_measures'] = ven 
        return jsonify(selected), 200
    
@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Assuming you have a function `classify_bird` to classify the image
        predicted_class = classify_bird(file_path)
        selected = next(
    (person for person in birds_data if person["common_name"].lower() == predicted_class.lower()), 
    None
)
    
        selected['imageUrl'] =  url_for('uploaded_file', filename=filename)
        return jsonify(selected), 200

@app.route('/dogs_classify', methods=['POST'])
def classify_image_dog():
    if 'image' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        img = tf.keras.preprocessing.image.load_img(file_path, target_size=(150, 150))
        x = tf.keras.preprocessing.image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = x / 255.0
        # Assuming you have a function `classify_bird` to classify the image
       
        label, df = predict_image(img)
        selected = next(
    (person for person in dogs_data if person["disease_name"].lower() == label.lower()), 
    None
)
        selected['imageUrl'] =  url_for('uploaded_file', filename=filename)
        return jsonify(selected), 200
    
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



@app.route('/submit-data', methods=['POST'])
def forest_fire():
    model_XGBOOST = joblib.load("KNN_Forest_Fire.pkl")
    data = request.json
    # Convert the received data into a two-dimensional array
    data_array = [[value for key, value in data.items()]]
    input_data = pd.DataFrame(data_array,
                          columns=["level_0",	"index",	"latitude",	"longitude",	"brightness",	"scan",	"acq_time", 	"satellite_0"	,"confidence",	"bright_t31",	"frp" ])
    
    y_XGBOOST = model_XGBOOST.predict(input_data)
    # Further processing can be done here
    return jsonify({"message": str(y_XGBOOST[0])})


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
