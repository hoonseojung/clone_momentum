const icon = document.querySelector("i");
const weather = document.querySelector(".js-weather");
const temperature = document.querySelector(".js-temperature");
const countryName = document.querySelector(".js-country");
const locationInfo = document.querySelector(".js-location");

const COORDS = "coords";
const API_KEY = "9adacca9966f81cd1a557927f4434567";

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //json이 준비되면
      const weatherTemperature = json.main.temp;
      const place = json.name;
      const country = json.sys.country;
      const condition = json.weather[0].main;
      printWeather(condition);
      printCountry(country, place);
      temperature.innerText = `${weatherTemperature}°C`;
    });
}

function printCountry(country, place) {
  countryName.innerText = `${country}`;
  locationInfo.innerText = `| ${place}`;
}

function printWeather(condition) {
  let weatherTitle = "";
  let weatherClass = "";

  if (condition === "Rain") {
    (weatherTitle = "비"), (weatherClass = "fas fa-cloud-rain");
  } else if (condition === "Clear") {
    (weatherTitle = "화창"), (weatherClass = "far fa-sun");
  } else if (condition === "Thunderstorm") {
    (weatherTitle = "천둥번개"), (weatherClass = "fas fa-bolt");
  } else if (condition === "Clouds") {
    (weatherTitle = "구름"), (weatherClass = "fas fa-cloud");
  } else if (condition === "Snow") {
    (weatherTitle = "눈"), (weatherClass = "far fa-snowflake");
  } else if (condition === "Drizzle") {
    (weatherTitle = "이슬비"), (weatherClass = "fas fa-umbrella");
  } else if (condition === "Haze") {
    (weatherTitle = "안개"), (weatherClass = "fas fa-cloud-meatball");
  } else if (condition === "Mist") {
    (weatherTitle = "안개"), (weatherClass = "fab fa-cloudsmith");
  } else {
    (weatherTitle = "적당한 날씨"), (weatherClass = "fas fa-feather-alt");
  }
  const className = weatherClass.split(" ");
  weatherIcon = icon.classList.add(...className);
  weatherName = weather.innerText = `${weatherTitle}`;
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  // 좌표 가지고 오는데 성공했을 경우를 처리하는 함수
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // latitude: latitude, longitude: longitude
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("지역을 찾을 수 없습니다.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
