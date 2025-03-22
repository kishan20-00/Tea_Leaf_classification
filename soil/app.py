from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
from vit_keras import vit
import tensorflow as tf
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# Initialize Flask app
app = Flask(__name__)

# Constants
IMAGE_SIZE = 224
model_class_names = ['Alluvial Soil', 'Black Soil', 'Cinder Soil', 'Laterite Soil', 'Peat Soil', 'Red Soil', 'Yellow Soil']

# Load the model
def create_model():
    vit_model = vit.vit_b16(
        image_size=IMAGE_SIZE,
        activation='softmax',
        pretrained=True,
        include_top=False,
        pretrained_top=False)

    model = tf.keras.Sequential([
        vit_model,
        Flatten(),
        Dense(7, activation='softmax')
    ])

    return model

# Load the model weights
tea_model = create_model()
tea_model.load_weights('soil.h5')  # Replace with the actual path to your model weights

# Function to predict soil type
def tea_growth_predict(image_path, model, model_class_names, IMAGE_SIZE):
    # Load the image
    img = image.load_img(image_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))
    img_array = image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    image_np_resized_normalized = np.vstack([img_batch]) / 255.0  # Normalize to [0,1]

    # Predict probabilities
    probabilities = model.predict(image_np_resized_normalized)

    # Get the class with the highest probability
    class_index = np.argmax(probabilities)
    class_label = model_class_names[class_index]

    # Get the confidence score as a percentage
    confidence_score = np.max(probabilities) * 100
    confidence_score = round(confidence_score, 2)

    return class_label, confidence_score

# API route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save the uploaded file temporarily
    filename = secure_filename(file.filename)
    img_path = os.path.join('uploads', filename)
    os.makedirs('uploads', exist_ok=True)  # Create 'uploads' directory if it doesn't exist
    file.save(img_path)

    # Predict the soil type
    class_label, confidence_score = tea_growth_predict(img_path, tea_model, model_class_names, IMAGE_SIZE)

    # Remove the temporary file
    os.remove(img_path)

    # Return the prediction result as JSON
    return jsonify({
        "predicted_class": class_label,
        "confidence": confidence_score
    })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)