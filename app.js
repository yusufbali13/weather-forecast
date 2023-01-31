const input = document.getElementById("input");
const button = document.getElementById("btn");
let city;

window.addEventListener("load", () => {
  input.focus();
});

button.addEventListener("click", () => {
  if (input.value.trim() != "") {
    city = input.value;
    console.log(city);
    input.value = "";
    input.focus();
    getWeatherInfo();
  }
});

input.addEventListener("keydown", (e) => {
  if (e.code == "Enter" || e.code == "NumpadEnter") {
    button.click();
  }
});

const API_KEY = "b57eb3897ee43736a71e86a7d7f99e3d";

const getWeatherInfo = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  try {
    const response = await fetch(URL);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Something went wrong:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    renderInfo(data);
  } catch (error) {
    console.log(error);
  }
};

const cityList = document.querySelector(".city-list");
let cities = [];

const renderInfo = (data) => {
  const temperature = Math.round(data.main.temp - 273.15);
  console.log(temperature);

  let cityName = data.name;

  if (data.name.endsWith(" Province")) {
    cityName = data.name.replace(" Province", "");
  }

  if (cities.includes(data.name)) {
    alert(`Daha önce ${cityName} hakkında sorgulama yapmıştınız!..`);
    return;
  }
  cities.push(data.name);

  cityList.innerHTML += `
    <li class="city-weather">
    <p class="city-name">
    ${cityName} <span>${data.sys.country}</span>
    </p>
    <h1 class="city-temprature">${temperature} <span>°C</span></h1>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="img">
    <p class="description">${data.weather[0].description}</p>
    </li>
    `;
};
