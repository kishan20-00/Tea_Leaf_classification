from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the saved model
loaded_model = load_model('tea_disease_efficientnet_model.h5')

# Load class_names
class_names = np.load('class_names.npy', allow_pickle=True).tolist()

# Function to preprocess the image
def preprocess_image(img_path, target_size=(300, 300)):
    img = image.load_img(img_path, target_size=target_size)  # Load and resize the image
    img_array = image.img_to_array(img)  # Convert to numpy array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize pixel values to [0, 1]
    return img_array

# Function to predict the class of an image
def predict_image_class(img_path, model):
    preprocessed_img = preprocess_image(img_path)
    predictions = model.predict(preprocessed_img)
    predicted_class = np.argmax(predictions, axis=1)[0]  # Get the predicted class index
    confidence = np.max(predictions)  # Get the confidence score
    return predicted_class, confidence

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Save the uploaded file temporarily
        filename = secure_filename(file.filename)
        img_path = os.path.join('uploads', filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(img_path)

        # Predict the class of the image
        predicted_class, confidence = predict_image_class(img_path, loaded_model)
        predicted_class_name = class_names[predicted_class]

        # Remove the temporary file
        os.remove(img_path)

        # Return the prediction result as JSON
        return jsonify({
            "predicted_class": predicted_class_name,
            "confidence": float(confidence * 100)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5001)