const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

let weatherData = {};

// get weather data from visual crossing API
async function getWeatherData() {
    const response = await axios.get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sirajganj?unitGroup=metric&key=3JCPTNAWW9PZUBER3D7GJ5HHQ&contentType=json"
    );
    let weatherData = {};
    response.data.days.forEach((i) => {
        weatherData[i.datetime] = [i.temp, i.preciptype[0]];
    });
    return weatherData;
}

// store weatherData
getWeatherData().then((data) => {
    weatherData = data;
});

// handle get weather data request
app.get("/get-weather-data", async (req, res) => {
    try {
        console.log("got req");
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
