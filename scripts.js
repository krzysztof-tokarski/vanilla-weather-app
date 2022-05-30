const API_KEY = '033fa64bd3ded1f74b129892183b79f2';
let city = 'Paris';
let countryCode = '';
let currentCity = {
  name: '',
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
    name: response.name,
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




async function fetchCityWeatherData() {
  const pull = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  const response = await pull.json();
  mapResponseData(response);
};



fetchCityWeatherData();



  // const pull = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}`);
