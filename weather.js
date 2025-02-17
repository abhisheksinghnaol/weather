const apiKey = '54cf998732aa4edc969131928251702';  
const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=';
const forecastUrl = 'https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=';  


// Getting the city value that is provide in Input box.
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
        fetchExtendedForecast(city);
    } else {
        alert("Please enter a city name!");
    }
});



document.getElementById('recent-cities').addEventListener('change', function() {
    const city = this.value;
    if (city !== 'Select a recent city') {
        fetchWeather(city);
        fetchExtendedForecast(city);  // Fetch the 5-day forecast
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

async function fetchExtendedForecast(city) {
    try {
        const response = await fetch(forecastUrl + city + '&days=7');
        if (!response.ok) throw new Error('Forecast data not found');
        const data = await response.json();
        displayExtendedForecast(data.forecast.forecastday);  // Pass the forecast data to display
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



function displayExtendedForecast(forecastData) {
    const forecastDisplay = document.getElementById('extended-forecast');
    forecastDisplay.innerHTML = `
        <h2 class="text-2xl font-bold text-center">7-Day Forecast</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            ${forecastData.map(day => `
                <div class="forecast-card p-5 bg-white shadow-md rounded-lg text-center">
                    <h3 class="text-xl font-semibold">${day.date}</h3>
                    <img src="https:${day.day.condition.icon}" alt="Weather icon" class="mx-auto" />
                    <p class="text-lg">${day.day.avgtemp_c}°C</p>
                    <p>Wind: ${day.day.maxwind_kph} km/h</p>
                    <p>Humidity: ${day.day.avghumidity}%</p>
                </div>
            `).join('')}
        </div>
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