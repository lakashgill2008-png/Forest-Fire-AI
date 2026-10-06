const predictBtn = document.getElementById("predictBtn");
const result = document.getElementById("result");

predictBtn.addEventListener("click", function () {
    result.classList.remove("low-risk", "moderate-risk", "high-risk");

    const temperature = Number(
        document.getElementById("temperature").value
    );

    const humidity = Number(
        document.getElementById("humidity").value
    );

    const wind = Number(
        document.getElementById("wind").value
    );

    const rainfall = Number(
        document.getElementById("rainfall").value
    );


    // Check inputs
    if (
    document.getElementById("temperature").value.trim() === "" ||
    document.getElementById("humidity").value.trim() === "" ||
    document.getElementById("wind").value.trim() === "" ||
    document.getElementById("rainfall").value.trim() === ""
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


    if (humidity < 0 || humidity > 100) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Humidity</h3>
        <p>Humidity must be between 0% and 100%.</p>
    `;
    return;
}
    if (humidity < 0 || humidity > 100) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Humidity</h3>
        <p>Humidity must be between 0% and 100%.</p>
    `;
    return;
}
if (humidity < 0 || humidity > 100) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Humidity</h3>
        <p>Humidity must be between 0% and 100%.</p>
    `;
    return;
}
//humididty validation
if (humidity < 0 || humidity > 100) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Humidity</h3>
        <p>Humidity must be between 0% and 100%.</p>
    `;
    return;
}
//Temperature validation
if (temperature < -50 || temperature > 60) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Temperature</h3>
        <p>Temperature must be between -50°C and 60°C.</p>
    `;
    return;
}
//Wild Validation
if (wind < 0 || wind > 200) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Wind Speed</h3>
        <p>Wind speed must be between 0 and 200 km/h.</p>
    `;
    return;
}
//Rainfall Validation
if (rainfall < 0 || rainfall > 1000) {
    result.innerHTML = `
        <span class="result-icon">⚠️</span>
        <h3>Invalid Rainfall</h3>
        <p>Rainfall must be between 0 and 1000 mm.</p>
    `;
    return;
}
// Temporary risk calculation
    let riskScore = 0;


    // Temperature
    if (temperature >= 35) {
        riskScore += 3;
    } else if (temperature >= 25) {
        riskScore += 2;
    } else {
        riskScore += 1;
    }


    // Humidity
    if (humidity <= 30) {
        riskScore += 3;
    } else if (humidity <= 60) {
        riskScore += 2;
    } else {
        riskScore += 1;
    }


    // Wind
    if (wind >= 30) {
        riskScore += 3;
    } else if (wind >= 15) {
        riskScore += 2;
    } else {
        riskScore += 1;
    }


    // Rainfall
    if (rainfall <= 5) {
        riskScore += 3;
    } else if (rainfall <= 20) {
        riskScore += 2;
    } else {
        riskScore += 1;
    }

    //Calculate risk Percentage
    const riskPercentage = Math.round((riskScore / 12) * 100);

    // Display result
    if (riskScore >= 10) {
    result.classList.add("high-risk");

        result.innerHTML = `
            <span class="result-icon">🔥</span>
            <h3>HIGH FIRE RISK</h3>
            <p>Risk Score: ${riskScore}/12</p>
            <p>Risk Level: ${riskPercentage}%</p>
            <p>
                ⚠️ Current conditions indicate
                a high possibility of forest fire.
            </p>
        `;

    } else if (riskScore >= 7) {
    result.classList.add("moderate-risk");

        result.innerHTML = `
            <span class="result-icon">⚠️</span>
            <h3>MODERATE FIRE RISK</h3>
            <p>Risk Score: ${riskScore}/12</p>
            <p>Risk Level: ${riskPercentage}%</p>
            <p>
                Current conditions require
                monitoring and caution.
            </p>
        `;

    } else {
    result.classList.add("low-risk");

        result.innerHTML = `
            <span class="result-icon">🟢</span>
            <h3>LOW FIRE RISK</h3>
            <p>Risk Score: ${riskScore}/12</p>
            <p>Risk Level: ${riskPercentage}%</p>
            <p>
                Current conditions require
                monitoring and caution.
            </p>
        `;
    }

});
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
    document.getElementById("prediction").scrollIntoView({
        behavior: "smooth"
    });
});