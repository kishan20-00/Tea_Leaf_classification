import requests

# URL of the Flask API
url = 'http://127.0.0.1:5000/predict'

# Path to the image you want to test
image_path = 'IMG_20220503_143639.jpg'  # Replace with the actual path to your image

try:
    # Open the image file in binary mode
    with open(image_path, 'rb') as file:
        files = {'file': file}  # Prepare the file for the request

        # Send a POST request to the Flask API
        response = requests.post(url, files=files)

    # Print the JSON response from the API
    if response.status_code == 200:
        print("Prediction Result:")
        print(response.json())
    else:
        print("Error:", response.status_code)
        print(response.json())
except requests.exceptions.ConnectionError as e:
    print("Connection Error:", e)
except Exception as e:
    print("An error occurred:", e)