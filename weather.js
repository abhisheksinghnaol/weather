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
        updateRecentCities(city);
    } catch (error) {
        showErrorModal();
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




function updateRecentCities(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
    }

    populateRecentCitiesDropdown(recentCities);
}


function populateRecentCitiesDropdown(recentCities) {
    const dropdown = document.getElementById('recent-cities');
    dropdown.innerHTML = '<option>Select a recent city</option>';
    recentCities.forEach(city => {
        const option = document.createElement('option');
        option.textContent = city;
        dropdown.appendChild(option);
    });
}


// Load recent cities on page load
window.onload = function() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    populateRecentCitiesDropdown(recentCities);
};




const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');

// Adding a functionality to reset values entered in search input option
searchButton.addEventListener('click', function () {
    const cityName = cityInput.value;
    cityInput.value = '';
});



function showErrorModal() {
    const modal = document.getElementById('error-modal');
    modal.classList.remove('hidden');  
}

// Close modal when user clicks close button
document.getElementById('close-modal').addEventListener('click', function() {
    const modal = document.getElementById('error-modal');
    modal.classList.add('hidden');  
});