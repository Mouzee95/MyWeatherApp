const City = document.querySelector("#input");
const searchButoon = document.querySelector(".search-btn");
const locationBtn = document.querySelector("#location_btn");


const API_KEY = "ae510149fcd8a8f4b834a36f2eb53906";

const createWeatherCard =(weatherItem) =>{
  return ``;
}

const WeatherDetails = (cityName, lat, lon) => {
  const weather_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(weather_API_URL).then(res => res.json()).then(data => {
    const uniqueForecastDays = [];
    
    const days = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
    });

    days.forEach(weatherItem  => {
      createWeatherCard(weatherItem);
      
    });

  }).catch(() => {
    alert("Error! cannot get your weather forcast")
  });

}

const getCoordinates = () => {
  const cityName = City.value.trim();
  if (!cityName) return;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;

  fetch(API_URL).then(res => res.json()).then(data => {
    if (!data.length) return alert(`cordinate for ${cityName} cannot be found`);
    console.log(data)
    const { name, lat, lon } = data[0];
    WeatherDetails(name, lat, lon);
  }).catch(() => {
    alert("Error! cannot get your location")
  });


}

searchButoon.addEventListener("click", event => {
  getCoordinates()
  event.preventDefault();
});

// Cloned one
