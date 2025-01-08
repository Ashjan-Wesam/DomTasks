const API_KEY = "c4de4041441555c3781b0930e62f6ca9";

document.addEventListener("DOMContentLoaded", () => {
  const cityDropdown = document.querySelector(".listcity");
  const weatherTemp = document.querySelector(".weather-temp");
  const weatherDesc = document.querySelector(".weather-desc");
  const pressureValue = document.querySelector(".PRESSURE.value");
  const humidityView = document.querySelector(".humidity-view");
  const windView = document.querySelector(".wind-view");
  const location = document.querySelector(".location");
  const calender = document.querySelector(".date-day");
  const fullday = document.querySelector(".date-dayname");
  const icon2 = document.getElementById("weather-icon");

  const dateFormat = new Date();

  const fullyear = dateFormat.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dayname = dateFormat.toLocaleDateString("en-US", {
    weekday: "long",
  });

  calender.textContent = fullyear;
  fullday.textContent = dayname;

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      updateWeatherUI(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function updateWeatherUI(data) {
    weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    pressureValue.textContent = `${data.main.pressure} hPa`;
    humidityView.textContent = `${data.main.humidity} %`;
    windView.textContent = `${data.wind.speed} km/h`;
    location.textContent = `${data.name}, ${data.sys.country}`;

    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon2.src = iconUrl; 
    icon2.alt = data.weather[0].description; 
  }

  cityDropdown.addEventListener("change", () => {
    const selectedCity = cityDropdown.value;
    fetchWeather(selectedCity);
  });

  fetchWeather(cityDropdown.value);
});
