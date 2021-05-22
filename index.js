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

function displayWeather(response) {
  let displaytemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let displaydescription = document.querySelector("#desc");
  let description = response.data.weather[0].description;
  let displaywind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  console.log(response.data.weather[0].description);

  displaytemp.innerHTML = `${temperature}`;
  displaydescription.innerHTML = `${description}`;
  displaywind.innerHTML = `${wind}`;
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
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

function showPosition(response) {
  let temp = Math.round(response.data.main.temp);
  let currentLoc = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentLoc}`;
  let displaytemp = document.querySelector("#temp");
  displaytemp.innerHTML = `${temp}`;
}

function showLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `935d2baef6aca0dcd939bbb78c6ba921`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPosition);
}
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}
let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", findCurrentLocation);

function selectFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 53.6;
}
function selectCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 12;
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", selectCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", selectFahrenheit);
