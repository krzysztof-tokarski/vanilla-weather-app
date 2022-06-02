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
  // TODO
}

async function fetchCityWeatherData(cityInputValue) {
  const pull = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}`);
  const response = await pull.json();
  if  (response.length > 0) {
    mapResponseData(response);

  } else {
    return alert("xD");
    // TODO
  }
};

weatherForm.addEventListener('input', () => {

  const formValidityState = weatherForm.checkValidity();

  if (!formValidityState) {
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
