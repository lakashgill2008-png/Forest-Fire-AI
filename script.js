// ============================================================
// FOREST FIRE AI - ML MODEL CONNECTION
// ============================================================

const predictBtn = document.getElementById("predictBtn");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");


// ============================================================
// PREDICTION BUTTON
// ============================================================

predictBtn.addEventListener("click", async function () {

    // Get input values
    const temperatureInput =
        document.getElementById("temperature").value.trim();

    const humidityInput =
        document.getElementById("humidity").value.trim();

    const windInput =
        document.getElementById("wind").value.trim();

    const rainfallInput =
        document.getElementById("rainfall").value.trim();


    // Remove previous result classes
    result.classList.remove(
        "low-risk",
        "moderate-risk",
        "high-risk"
    );


    // ========================================================
    // VALIDATE EMPTY INPUTS
    // ========================================================

    if (
        temperatureInput === "" ||
        humidityInput === "" ||
        windInput === "" ||
        rainfallInput === ""
    ) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Please Enter All Values</h3>
            <p>
                Enter temperature, humidity, wind speed
                and rainfall.
            </p>
        `;

        return;
    }


    // Convert values to numbers
    const temperature = Number(temperatureInput);
    const humidity = Number(humidityInput);
    const wind = Number(windInput);
    const rainfall = Number(rainfallInput);


    // ========================================================
    // CHECK FOR INVALID NUMBERS
    // ========================================================

    if (
        !Number.isFinite(temperature) ||
        !Number.isFinite(humidity) ||
        !Number.isFinite(wind) ||
        !Number.isFinite(rainfall)
    ) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Invalid Input</h3>
            <p>
                Please enter valid numerical values.
            </p>
        `;

        return;
    }


    // ========================================================
    // VALIDATE HUMIDITY
    // ========================================================

    if (humidity < 0 || humidity > 100) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Invalid Humidity</h3>
            <p>
                Humidity must be between 0% and 100%.
            </p>
        `;

        return;
    }


    // ========================================================
    // VALIDATE TEMPERATURE
    // ========================================================

    if (temperature < -50 || temperature > 60) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Invalid Temperature</h3>
            <p>
                Temperature must be between -50°C and 60°C.
            </p>
        `;

        return;
    }


    // ========================================================
    // VALIDATE WIND SPEED
    // ========================================================

    if (wind < 0 || wind > 200) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Invalid Wind Speed</h3>
            <p>
                Wind speed must be between 0 and 200 km/h.
            </p>
        `;

        return;
    }


    // ========================================================
    // VALIDATE RAINFALL
    // ========================================================

    if (rainfall < 0 || rainfall > 1000) {

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>Invalid Rainfall</h3>
            <p>
                Rainfall must be between 0 and 1000 mm.
            </p>
        `;

        return;
    }


    // ========================================================
    // SHOW LOADING MESSAGE
    // ========================================================

    result.innerHTML = `
        <span class="result-icon">🤖</span>
        <h3>AI ANALYZING...</h3>
        <p>
            Sending environmental data to the
            Forest Fire AI model.
        </p>
    `;


    // ========================================================
    // SEND DATA TO FLASK BACKEND
    // ========================================================

    try {

        const response = await fetch(
            "https://forest-fire-ai.onrender.com/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    temperature: temperature,

                    humidity: humidity,

                    wind: wind,

                    rainfall: rainfall

                })
            }
        );


        // Convert Flask response to JSON
        const data = await response.json();


        // ====================================================
        // CHECK BACKEND ERROR
        // ====================================================

        if (!response.ok || !data.success) {

            throw new Error(
                data.error || "Prediction failed."
            );
        }


        // ====================================================
        // GET PREDICTION
        // ====================================================

        const prediction = data.prediction;

        const riskLevel = data.risk_level;

        const message = data.message;

        const probability = data.probability;


        // ====================================================
        // GET MODEL CONFIDENCE
        // ====================================================

        let confidence = 0;

        if (probability && probability[prediction] !== undefined) {

            confidence = probability[prediction];
        }


        // ====================================================
        // DISPLAY HIGH FIRE RISK
        // ====================================================

        if (prediction === "fire") {

            result.classList.add("high-risk");

            result.innerHTML = `

                <span class="result-icon">🔥</span>

                <h3>HIGH FIRE RISK</h3>

                <p>
                    <strong>AI Prediction:</strong>
                    Fire
                </p>

                <p>
                    <strong>Model Confidence:</strong>
                    ${confidence}%
                </p>

                <p>
                    ⚠️ ${message}
                </p>

                <p>
                    Current environmental conditions
                    require attention.
                </p>

            `;
        }


        // ====================================================
        // DISPLAY LOW FIRE RISK
        // ====================================================

        else {

            result.classList.add("low-risk");

            result.innerHTML = `

                <span class="result-icon">✓</span>

                <h3>LOW FIRE RISK</h3>

                <p>
                    <strong>AI Prediction:</strong>
                    No Fire
                </p>

                <p>
                    <strong>Model Confidence:</strong>
                    ${confidence}%
                </p>

                <p>
                    ✅ ${message}
                </p>

                <p>
                    Current environmental conditions
                    indicate a relatively low risk.
                </p>

            `;
        }


    }


    // ========================================================
    // HANDLE CONNECTION / OTHER ERRORS
    // ========================================================

    catch (error) {

        console.error("Prediction Error:", error);

        result.classList.remove(
            "low-risk",
            "moderate-risk",
            "high-risk"
        );

        result.innerHTML = `

            <span class="result-icon">❌</span>

            <h3>Connection Error</h3>

            <p>
                Could not connect to the Forest Fire AI server.
            </p>

            <p>
                Make sure <strong>tapp.py</strong> is running.
            </p>

        `;
    }

});


// ============================================================
// START PREDICTION BUTTON
// ============================================================

startBtn.addEventListener("click", function () {

    document.getElementById("prediction").scrollIntoView({
        behavior: "smooth"
    });

});