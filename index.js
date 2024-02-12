let lang = "en",
  state = "Beruniy",
  units = "metric",
  city = document.querySelector(".wheather_location"),
  weatherForecast = document.querySelector(".wheather_forecast"),
  weatherTemp = document.querySelector(".weather_temperature"),
  weatherIcon = document.querySelector(".wheather_icon"),
  min = document.querySelector(".min"),
  max = document.querySelector(".max"),
  realFeel = document.querySelector(".weather_real_feel"),
  humidity = document.querySelector(".weather_humidity"),
  wind = document.querySelector(".weather_wind"),
  pressure = document.querySelector(".weather_pressure"),
  form = document.querySelector("form"),
  input = document.querySelector("input");

// Search Engine

form.addEventListener("submit", (events) => {
  events.preventDefault();
  state = input.value;
  getWeather();
});

// Units change on click

let celcius = document
  .querySelector(".wheather_unit_celcius_img")
  .addEventListener("click", () => {
    if (units == "imperial") {
      units = "metric";
      getWeather();
    }
  });
let fahrenheit = document
  .querySelector(".wheather_unit_fahrenheit_img")
  .addEventListener("click", () => {
    if (units == "metric") {
      units = "imperial";
      getWeather();
    }
  });

// Date

var weatherData = document.querySelector(".weather_data");

function getTimeBasedOnLocation() {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat([], options);
  return formatter.format(new Date());
}

function capitalizeDate(dateIntoString) {
  const parts = dateIntoString.split(" ");
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
  return parts.join(" ");
}

setInterval(() => {
  const dateIntoString = getTimeBasedOnLocation();
  const capitalizedDate = capitalizeDate(dateIntoString);
  weatherData.textContent = capitalizedDate;
}, 1000);

// Getting Weather Information

const getWeather = () => {
  const apiKey = "35f263f38c1515732dfbc2b30269e82b";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=${units}&lang=${lang}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.textContent = `${data.name}, ${convertCountry(data.sys.country)}`;
      weatherForecast.innerHTML = `<p>${data.weather[0].main}</p> <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
      weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`;
      min.innerHTML = `Min ${data.main.temp_min.toFixed()}&#176`;
      max.innerHTML = `Max ${data.main.temp_max.toFixed()}&#176`;
      realFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      humidity.innerHTML = `${data.main.humidity.toFixed()}%`;
      wind.innerHTML = `${data.wind.speed} m/s`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
    });
};

getWeather();

// Converting country code

const convertCountry = (country) => {
  let regionFullName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionFullName.of(country);
};
