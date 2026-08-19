from flask import Flask, request, jsonify
import pickle
import numpy as np
import os

app = Flask(__name__)

# Load the model
MODEL_PATH = 'phishing_model.pkl'
model = None

if os.path.exists(MODEL_PATH):
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        print(f"Successfully loaded model from {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")
else:
    print(f"Warning: {MODEL_PATH} not found. Server will start but predictions will fail.")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        # Get JSON data
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({"error": "Missing 'features' in request body"}), 400
            
        features_list = data['features']
        
        # Validate feature count (optional but good for debugging)
        if len(features_list) != 30:
            return jsonify({"error": f"Expected 30 features, got {len(features_list)}"}), 400

        # Convert to numpy array of shape (1, 30)
        features_array = np.array(features_list).reshape(1, -1)

        # Predict
        # The model returns [1] for safe or [-1] for phishing
        prediction = model.predict(features_array)[0]

        # Map prediction to boolean
        # 1 => safe (True)
        # -1 => phishing (False)
        is_safe = True if prediction == 1 else False

        return jsonify({
            "safe": is_safe
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting AI Server on port 5000...")
    app.run(host='0.0.0.0', port=5000)
