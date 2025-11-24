// API KEY
const API_KEY = "36ec6b78ffc0e06ff67e5dd5f3661f15";

// DOM elements
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const messageEl = document.getElementById("message");
const resultEl = document.getElementById("weather-result");

const cityNameEl = document.getElementById("city-name");
const countryNameEl = document.getElementById("country-name");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const iconEl = document.getElementById("weather-icon");
const searchBtn = document.getElementById("search-btn");

function showMessage(text, type = "info") {

  messageEl.textContent = text;
  messageEl.className = `alert alert-${type}`;
  messageEl.classList.remove("d-none");
}

// Message hide
function hideMessage() {
  messageEl.classList.add("d-none");
}

// Loading state
function setLoading(isLoading) {
  if (isLoading) {
    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";
  } else {
    searchBtn.disabled = false;
    searchBtn.textContent = "Get Weather";
  }
}

// API call
async function fetchWeather(city) {
  // Safety: empty city
  if (!city || !city.trim()) {
    showMessage("Please enter a city name.", "warning");
    resultEl.classList.add("d-none");
    return;
  }

  hideMessage();
  setLoading(true);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showMessage("City not found. Please check the name and try again.", "danger");
      } else {
        showMessage("Could not fetch weather data. Please try again later.", "danger");
      }
      resultEl.classList.add("d-none");
      setLoading(false);
      return;
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error(error);
    showMessage("Network error. Please check your connection.", "danger");
    resultEl.classList.add("d-none");
  } finally {
    setLoading(false);
  }
}

// UI update
function updateUI(data) {
  // City + country
  cityNameEl.textContent = data.name || "";
  countryNameEl.textContent = data.sys?.country ? `(${data.sys.country})` : "";

  // Temperature, feels like, description
  const temp = Math.round(data.main?.temp);
  const feels = Math.round(data.main?.feels_like);
  const desc = data.weather?.[0]?.description || "";

  temperatureEl.textContent = Number.isFinite(temp) ? `${temp}°C` : "";
  descriptionEl.textContent = desc;
  feelsLikeEl.textContent = Number.isFinite(feels)
    ? `Feels like: ${feels}°C`
    : "";

  // Icon
  const iconCode = data.weather?.[0]?.icon;
  if (iconCode) {
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = desc;
    iconEl.classList.remove("d-none");
  } else {
    iconEl.classList.add("d-none");
  }

  // Extra stats
  humidityEl.textContent = data.main?.humidity != null ? `${data.main.humidity}%` : "-";
  windEl.textContent = data.wind?.speed != null ? `${data.wind.speed} m/s` : "-";
  pressureEl.textContent = data.main?.pressure != null ? `${data.main.pressure} hPa` : "-";

  resultEl.classList.remove("d-none");
}

// Form submit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  fetchWeather(city);
});
