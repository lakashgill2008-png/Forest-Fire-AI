import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


# ============================================================
# 1. LOAD DATASET
# ============================================================

data = pd.read_csv(
    "dataset.csv",
    skiprows=1,
    skipinitialspace=True
)


# ============================================================
# 2. CLEAN COLUMN NAMES
# ============================================================

data.columns = data.columns.str.strip()


# ============================================================
# 3. CLEAN TARGET COLUMN
# ============================================================

data["Classes"] = (
    data["Classes"]
    .astype(str)
    .str.strip()
    .str.lower()
)


# Remove repeated header row
data = data[data["Classes"] != "classes"]


# ============================================================
# 4. SELECT ONLY WEBSITE INPUTS
# ============================================================

feature_columns = [
    "Temperature",
    "RH",
    "Ws",
    "Rain"
]


# ============================================================
# 5. CONVERT INPUT FEATURES TO NUMERIC
# ============================================================

for column in feature_columns:
    data[column] = pd.to_numeric(
        data[column],
        errors="coerce"
    )


# ============================================================
# 6. REMOVE MISSING VALUES
# ============================================================

data = data.dropna(
    subset=feature_columns + ["Classes"]
)


# ============================================================
# 7. SEPARATE FEATURES AND TARGET
# ============================================================

X = data[feature_columns]
y = data["Classes"]


print("========================================")
print("FOREST FIRE AI MODEL")
print("========================================")

print("\nDataset shape:")
print(data.shape)

print("\nFeatures used by website:")
print(feature_columns)

print("\nTarget distribution:")
print(y.value_counts())


# ============================================================
# 8. SPLIT DATASET
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42,
    stratify=y
)


print("\n========================================")
print("TRAIN / TEST SPLIT")
print("========================================")

print("\nTraining data shape:")
print(X_train.shape)

print("\nTesting data shape:")
print(X_test.shape)


# ============================================================
# 9. CREATE RANDOM FOREST MODEL
# ============================================================

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)


# ============================================================
# 10. TRAIN MODEL
# ============================================================

print("\n========================================")
print("TRAINING MODEL")
print("========================================")

model.fit(X_train, y_train)

print("Model training completed!")


# ============================================================
# 11. MAKE PREDICTIONS
# ============================================================

y_pred = model.predict(X_test)


# ============================================================
# 12. MODEL EVALUATION
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)


print("\n========================================")
print("MODEL EVALUATION")
print("========================================")

print(f"\nAccuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred
    )
)

print("\nConfusion Matrix:")
print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# ============================================================
# 13. SAVE MODEL
# ============================================================

joblib.dump(
    model,
    "forest_fire_model.pkl"
)


print("\n========================================")
print("MODEL SAVED")
print("========================================")

print("Saved as: forest_fire_model.pkl")
print("\nThe model now expects:")
print("Temperature")
print("Humidity (RH)")
print("Wind Speed (Ws)")
print("Rainfall")