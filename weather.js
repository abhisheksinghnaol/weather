const apiKey = '54cf998732aa4edc969131928251702';  
const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=';
const forecastUrl = 'https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=';  


// Getting the city value that is provide in Input box.
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});


// Fetching the Current weather conditions by making API Call to Weather API
async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Error: " + error.message);
    }
}


// Creating a function to display weather conditon values we received from making API Calls.
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    console.log(data)
    weatherDisplay.innerHTML = `
        <h2 class="text-2xl font-bold">${data.location.name},${data.location.region}, ${data.location.country}</h2>
        <p class="text-xl">${data.current.temp_c}°C</p>
        <p>${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="Weather icon" />
        <p>Humidity: ${data.current.humidity}%</p>
        <p>UV Index: ${data.current.uv}
        <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        <p>Lat&Long: ${data.location.lat},${data.location.lon}</p>
    `;
}