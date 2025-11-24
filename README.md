# Weather App

A simple **Weather App** built with **HTML**, **CSS**, **Bootstrap 5**, and **JavaScript**.  
The user can enter a city name and see the current weather details using the OpenWeatherMap API.

> Built as a practice / portfolio project for frontend development.

---

## 🔗 Live Demo

https://github.com/Aman-choudhary-99/Weather-App/

--

## ✨ Features

- Search weather by **city name**  
- Shows:
  - City and country
  - Current temperature (°C)
  - Weather description and icon
  - “Feels like” temperature
  - Humidity, wind speed, and pressure
- Loading state on button (`Get Weather` → `Loading...`)  
- Proper error messages for:
  - Empty input
  - City not found (404)
  - Network / API errors  
- Responsive UI using **Bootstrap card & grid**

---

## 🛠️ Technologies Used

- **HTML5** – structure  
- **CSS3** – basic layout and custom styling (`weather.css`)  
- **Bootstrap 5** – responsive layout, card, form, buttons  
- **JavaScript (ES6)** – Fetch API, DOM updates, error handling  
- **OpenWeatherMap API** – weather data (metric units – °C)

---

## 📁 Project Structure

```text
.
├── index.html    # Main page (markup + Bootstrap + app layout)
├── weather.css   # Custom styles for the weather card and page
└── weather.js    # API calls and UI update logic
