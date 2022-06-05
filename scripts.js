const main = document.querySelector('main');
const submitButton = document.getElementById('submit-button');
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');

const API_KEY = '033fa64bd3ded1f74b129892183b79f2';
let city = '';
// let city = 'Paris';
// let countryCode = '';
// TODO
let currentCity = {
  cityName: '',
  countryCode: '',
  temperature: {
    feelsLike: '',
    actual: '',
    min: '',
    max: '',
    pressure: '',
    humidity: '',
  },
  weather: {
    description: '',
    icon: '',
  },
  wind: {
    speed: '',
    degree: ''
  }
};


function mapResponseData(response) {
  return currentCity = {
    cityName: response.name,
    countryCode: response.sys.country,
    temperature: {
      feelsLike: response.main.feels_like,
      actual: response.main.temp,
      min: response.main.temp_min,
      max: response.main.temp_max,
      pressure: response.main.pressure,
      humidity: response.main.humidity,
    },
    weather: {
      description: response.weather[0].description,
      icon: response.weather[0].icon,
    },
    wind: {
      speed: response.wind.speed,
      degree: response.wind.deg,
    }
  };
};

function prepareShowcase() {
  const showcase = document.createElement('div');
  showcase.setAttribute('id', 'showcase');
  
  const cityInfo = document.createElement('div');
  const cityInfoHeader = document.createElement('h2');
  const cityName = document.createElement('p');
  const countryCode = document.createElement('p');
  cityInfoHeader.textContent = "CITY INFO";
  cityName.textContent = currentCity.cityName;
  countryCode.textContent = currentCity.countryCode;
  cityInfo.appendChild(cityInfoHeader);
  cityInfo.appendChild(cityName);
  cityInfo.appendChild(countryCode);

  const temperatureInfo = document.createElement('div');
  const temperatureInfoHeader = document.createElement('h2');
  const feelsLike = document.createElement('p');
  const actual = document.createElement('p');
  const min = document.createElement('p');
  const max = document.createElement('p');
  const pressure = document.createElement('p');
  const humidity = document.createElement('p');
  temperatureInfoHeader.textContent = "TEMPERATURE INFO";
  feelsLike.textContent = `Feels like: ${currentCity.temperature.feelsLike}`;
  actual.textContent = `Actual: ${currentCity.temperature.actual}`;
  min.textContent = `Min: ${currentCity.temperature.min}`;
  max.textContent = `Max: ${currentCity.temperature.max}`;
  pressure.textContent = `Pressure: ${currentCity.temperature.pressure}`;
  humidity.textContent = `Humidity: ${currentCity.temperature.humidity}`;
  const temparatureArray = [temperatureInfoHeader, feelsLike, actual, min, max, pressure, humidity];
  temparatureArray.forEach(data => {
    temperatureInfo.appendChild(data);
  })

  const weatherInfo = document.createElement('div');
  const weatherInfoHeader = document.createElement('h2');
  const description = document.createElement('p');
  weatherInfoHeader.textContent = 'WEATHER INFO';
  description.textContent = `Weather description: ${currentCity.weather.description}`;
  // const icon = 
  // TODO
  weatherInfo.appendChild(weatherInfoHeader);
  weatherInfo.appendChild(description);


  const windInfo = document.createElement('div');
  const windInfoHeader = document.createElement('h2');
  const windSpeed = document.createElement('p');
  const windDegree = document.createElement('p');
  windInfoHeader.textContent = "WIND INFO";
  windSpeed.textContent = `Wind speed: ${currentCity.wind.speed}`;
  windDegree.textContent = `Wind speed: ${currentCity.wind.degree}`;
  windInfo.appendChild(windInfoHeader);
  windInfo.appendChild(windSpeed);
  windInfo.appendChild(windDegree);

  const sections = [cityInfo, temperatureInfo, weatherInfo, windInfo];
  sections.forEach(index => {
    const section = document.createElement('section');
    section.appendChild(index);
    showcase.appendChild(section);
  });
  
  main.appendChild(showcase);
}

async function fetchCityWeatherData(cityInputValue) {
  const pull = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}`);
  const response = await pull.json();
  console.log(response);

  if  (response.cod === 200) {
    mapResponseData(response);
    prepareShowcase();
  } else {
    return console.log(response.cod, response.message);
    // TODO
  }
};

weatherForm.addEventListener('input', () => {
  const formValidityState = weatherForm.checkValidity();

  if (!formValidityState || cityInput.value.length < 3) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

submitButton.addEventListener('click', async () => {
  const cityInputValue = cityInput.value;
  await fetchCityWeatherData(cityInputValue);
})




// const fluidContainer = document.getElementById('fluid-container');




  // const pull = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}`);
