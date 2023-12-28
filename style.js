const City = document.querySelector("#input");
const searchButoon = document.querySelector(".search-btn");
const locationBtn = document.querySelector("#location_btn");
const WeatherContainer = document.querySelector(".days");
const Currentweather = document.querySelector(".card");


const API_KEY = "ae510149fcd8a8f4b834a36f2eb53906";

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index===0) {
    return `  <div class="card center-center">
                <h4>${cityName} ${weatherItem.dt_txt.split(" ")[0]}</h4>
                <img src="${weatherItem.weather[0].icon}">
                <P>
                    <center> <b><small>temp  ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
                </P>
            </div>`
    
  } else{
    return ` <div class="day"><b><small>${weatherItem.dt_txt.split(" ")[0]}</small></b> <br>
            <img src="${weatherItem.weather[0].icon}">
            <P>
                    <center> <b><small>temp ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
            </P>
        </div>`;
  }

  
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
  

    City.value="";
    WeatherContainer.innerHTML="";

    console.log(days)
    days.forEach(weatherItem, index => {
      if(index===0){
        WeatherContainer.insertAdjacentElement("beforeend",  createWeatherCard(cityName, weatherItem, index));
      } else{
        WeatherContainer.insertAdjacentElement("beforeend",  createWeatherCard(cityName, weatherItem, index));
      }
     

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
    // console.log(data)
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
