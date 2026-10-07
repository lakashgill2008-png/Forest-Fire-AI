# 🌲 ForestGuard AI — Forest Fire Risk Detection

## 📌 Project Overview

ForestGuard AI is an AI-powered web application designed to predict forest fire risk based on environmental conditions.

The system takes four environmental inputs:

- Temperature
- Humidity
- Wind Speed
- Rainfall

These values are sent to a trained Machine Learning model, which predicts whether the current conditions indicate Fire or No Fire.

## 🎯 Objective

The main objective of this project is to demonstrate how Artificial Intelligence and Machine Learning can be used to analyze environmental conditions and assist in identifying potential forest fire risk.

## 🤖 Machine Learning Model

The project uses a Random Forest Classifier.

### Features Used

- Temperature
- RH (Relative Humidity)
- Ws (Wind Speed)
- Rain (Rainfall)

### Target

The model predicts:

- Fire
- No Fire

### Model Accuracy

The current model achieved approximately 82.19% accuracy on the held-out test dataset.

Note: This accuracy is based on the available dataset and is intended for this academic project/demo. It should not be treated as a real-world fire-warning system.

## 📊 Dataset

The project uses the Algerian Forest Fires dataset.

The original dataset contains environmental measurements and corresponding forest-fire classes.

This project uses the following four variables as website inputs:

Temperature
RH
Ws
Rain

## 🌐 Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask
- Flask-CORS

### Machine Learning

- Pandas
- Scikit-learn
- Joblib
- Random Forest Classifier

### Development Tools

- Visual Studio Code
- Git
- GitHub

## 🔄 How the System Works

User enters environmental data
        ↓
JavaScript
        ↓
Flask Backend
        ↓
Trained ML Model
        ↓
Random Forest Classifier
        ↓
Fire / No Fire
        ↓
Result displayed on Website

## 📁 Project Structure

Forest-Fire-AI/
│
├── index.html
├── style.css
├── script.js
├── tapp.py
├── train_model.py
├── dataset.csv
├── forest_fire_model.pkl
└── README.md

### File Description

index.html
Contains the structure and content of the website.

style.css
Controls the appearance, layout, colors and responsive design.

script.js
Collects user input and communicates with the Flask backend.

tapp.py
Runs the Flask backend and provides the prediction API.

train_model.py
Loads the dataset, trains the Random Forest model and saves it.

dataset.csv
Contains the forest-fire dataset used for training.

forest_fire_model.pkl
Contains the trained Machine Learning model.

README.md
Contains documentation and instructions for the project.

## ▶️ How to Run the Project

### 1. Install Python Dependencies

Open the VS Code terminal and run:

pip install pandas scikit-learn joblib flask flask-cors

### 2. Train the Model

Run:

python train_model.py

This creates:

forest_fire_model.pkl

### 3. Start the Flask Backend

Run:

python tapp.py

The backend will run at:

http://127.0.0.1:5000

### 4. Open the Website

Open index.html in your browser.

Enter:

- Temperature
- Humidity
- Wind Speed
- Rainfall

Then click Predict Risk.

The website communicates with the Flask backend, which uses the trained Random Forest model to generate the prediction.

## 🧪 Example

### Example 1 — High Fire Risk

Temperature: 40°C
Humidity: 20%
Wind: 25
Rainfall: 1 mm

Possible result:

HIGH FIRE RISK
AI Prediction: Fire

### Example 2 — Low Fire Risk

Temperature: 18°C
Humidity: 85%
Wind: 8
Rainfall: 40 mm

Possible result:

LOW FIRE RISK
AI Prediction: No Fire

## 🚀 Future Improvements

Possible future improvements include:

- Real-time weather data integration
- Interactive maps
- Location-based fire-risk monitoring
- Historical fire-risk analysis
- More advanced Machine Learning models
- Larger and more diverse datasets
- Real-time alerts and notifications
- Deployment to a public web server

## ⚠️ Disclaimer

This project is developed for educational and demonstration purposes.

The predictions are based on a limited dataset and should not be used as a substitute for official wildfire monitoring, emergency services, or professional environmental risk assessment.

## 👨‍💻 Project

ForestGuard AI — AI-Based Detection of Forest Fire Risk

Technologies:
HTML • CSS • JavaScript • Python • Flask • Machine Learning