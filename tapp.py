from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os


# ============================================================
# CREATE FLASK APP
# ============================================================

app = Flask(__name__)
CORS(app)


# ============================================================
# LOAD TRAINED MODEL
# ============================================================

model = joblib.load("forest_fire_model.pkl")


# ============================================================
# HOME ROUTE
# ============================================================

@app.route("/")
def home():
    return jsonify({
        "message": "Forest Fire AI Backend is running!"
    })


# ============================================================
# PREDICTION ROUTE
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # Get data sent by website
        data = request.get_json()

        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        wind = float(data["wind"])
        rainfall = float(data["rainfall"])


        # Prepare input for ML model
        input_data = [[
            temperature,
            humidity,
            wind,
            rainfall
        ]]


        # Make prediction
        prediction = model.predict(input_data)[0]


        # Get model probabilities
        probabilities = model.predict_proba(input_data)[0]

        classes = model.classes_


        probability_dict = {
            str(classes[i]): round(
                probabilities[i] * 100,
                2
            )
            for i in range(len(classes))
        }


        # Convert prediction into readable result
        if prediction == "fire":

            risk_level = "HIGH"

            message = (
                "The AI model predicts a fire risk."
            )

        else:

            risk_level = "LOW"

            message = (
                "The AI model predicts a low fire risk."
            )


        # Send result back to website
        return jsonify({

            "success": True,

            "prediction": prediction,

            "risk_level": risk_level,

            "message": message,

            "probability": probability_dict

        })


    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 400


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            5000
        )
    )

    app.run(
        host="0.0.0.0",
        port=port
    )