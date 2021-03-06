let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

function updateDate() {
  let day = document.querySelector("#today-day");
  day.innerHTML = currentDay;
  let hour = document.querySelector("#current-hour");
  hour.innerHTML = currentHour;
  let minute = document.querySelector("#current-minute");
  minute.innerHTML = currentMinute;
}

updateDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
                  <h4>${formatDay(forecastDay.dt)}</h4>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" id="icon" />
                  <h5 class="temperature">${Math.round(
                    forecastDay.temp.max
                  )}°C</h5>
                  <h6>${Math.round(forecastDay.temp.min)}°C</h6>
                </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "935d2baef6aca0dcd939bbb78c6ba921";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  let displayTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let displayDescription = document.querySelector("#desc");
  let description = `${
    response.data.weather[0].description
  }. Feels like ${Math.round(response.data.main.feels_like)}°C.`;
  let displayWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let displayHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let displayIcon = document.querySelector("#current-icon");
  celciusTemperature = response.data.main.temp;
  displayTemp.innerHTML = `${temperature}`;
  displayDescription.innerHTML = `${description}`;
  displayWind.innerHTML = `${wind}`;
  displayHumidity.innerHTML = `${humidity}`;
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  city.innerHTML = input.value;
  updateDate();
  let apiKey = "935d2baef6aca0dcd939bbb78c6ba921";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
  updateDate();
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

function showPosition(response) {
  let currentLoc = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentLoc}`;
  displayWeather(response);
}

function showLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `935d2baef6aca0dcd939bbb78c6ba921`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPosition);
  updateDate();
}
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}
let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", findCurrentLocation);

function selectFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
  updateDate();
}
function selectCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temp.innerHTML = Math.round(celciusTemperature);
  updateDate();
}

let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", selectCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", selectFahrenheit);

displayForecast();
