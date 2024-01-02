const City = document.querySelector("#input");
const searchButton = document.querySelector(".search-btn");
const locationBtn = document.querySelector("#location_btn");
const WeatherContainer = document.querySelector(".days");
const Currentweather = document.querySelector(".card");

const API_KEY = "ae510149fcd8a8f4b834a36f2eb53906";

const  createWeatherCard = (cityName, weatherItem, indx) => {
  if(indx===0){
      return `<div class="card center-center">
                  <h4>${cityName} ${weatherItem.dt_txt.split(" ")[0]}</h4>
                    <img src="./img/sun2.png" alt="">
                    <P>
                        <center> <b><small>temp  ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
                    </P>
               </div>`;

  }else{
    return `<div class="day"><b><small>${weatherItem.dt_txt.split(" ")[0]}</small></b> <br>
                <img src="${weatherItem.weather[0].icon}">
                <P>
                 <center> <b><small>temp ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
                </P>
            </div>`;
  }   
}
const wetherDetails= (cityName,lat, lon ) =>{
  const weather_API_URL=`http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  fetch(weather_API_URL).then(res =>res.json()).then(data => {
    
    const uniqueForecastDays=[];
    const daysForecast= data.list.filter(forecast => {
      const forecastDate =new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)){
        return uniqueForecastDays.push(forecastDate)
      }
    });

     City.value="";
    WeatherContainer.innerHTML="";
    Currentweather.innerHTML="";

    // console.log(daysForecast);
    daysForecast.forEach((weatherItem, indx) => {
      if(!indx === 0) {
        WeatherContainer.insertAdjacentHTML("beforeend",createWeatherCard (cityName, weatherItem, indx));
      }else{
        WeatherContainer.insertAdjacentHTML("beforeend",createWeatherCard (cityName, weatherItem, indx));
      }
     });

  }).catch(() => {
    alert("Error!! cannot get your weather forecast")
  })
}   

const coordinate=() =>{
  const cityName= City.value.trim();
  if (!cityName) return ;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;

  fetch(API_URL).then(res =>res.json()).then(data => {
    if (!data.length) 
      return alert(`Coordinate found for ${cityName}`);
    const {name, lat, lon}=data[0];
    wetherDetails(name, lat, lon);
  }).catch(() => {
    alert("Error!! cannot get your coordinates")
  }) 
}
// searchButton.addEventListener("click", coordinate)
const userCoordinates =() =>{
    navigator.geolocation.getCurrentPosition(
      position => {
      const { latitude, longitude}= position.coords;
      const reverseGeocodingUrl=`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
      
      fetch(reverseGeocodingUrl).then(res =>res.json()).then(data => {
        const {name}=data[0];
        wetherDetails(name, latitude, longitude);
      }).catch(() => {
        alert("Error!! cannot get your coordinates")
      }) 
      },
      error =>{
        if (error.code === error.PERMISSION_DENIED){
          alert ("failed to get your current location, Please check your settings")
        }
      }
    )
}

locationBtn.addEventListener("click", event=> {
  userCoordinates()
  event.preventDefault(); 
});
searchButton.addEventListener("click", event => {
    coordinate()
    event.preventDefault();
  });
  



// const API_KEY = "ae510149fcd8a8f4b834a36f2eb53906";

// const createWeatherCard = (cityName, weatherItem, index) => {
//   if (index===0) {
//     return `  <div class="card center-center">
//                 <h4>${cityName} ${weatherItem.dt_txt.split(" ")[0]}</h4>
//                 <img src="${weatherItem.weather[0].icon}">
//                 <P>
//                     <center> <b><small>temp  ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
//                 </P>
//             </div>`
    
//   } else{
//     return ` <div class="day"><b><small>${weatherItem.dt_txt.split(" ")[0]}</small></b> <br>
//             <img src="${weatherItem.weather[0].icon}">
//             <P>
//                     <center> <b><small>temp ${(weatherItem.main.temp -273.15).toFixed(2)}&#8451;</small></b></center>
//             </P>
//         </div>`;
//   }

  
// }

// const WeatherDetails = (cityName, lat, lon) => {
//   const weather_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//   fetch(weather_API_URL).then(res => res.json()).then(data => {

//     const uniqueForecastDays = [];
//     const days = data.list.filter(forecast => {
//       const forecastDate = new Date(forecast.dt_txt).getDate();
//       if (!uniqueForecastDays.includes(forecastDate)) {
//         return uniqueForecastDays.push(forecastDate);
//       }
//     });
  

//     City.value="";
//     WeatherContainer.innerHTML="";

//     console.log(days)
//     days.forEach(weatherItem, index => {
//       if(index===0){
//         WeatherContainer.insertAdjacentElement("beforeend",  createWeatherCard(cityName, weatherItem, index));
//       } else{
//         WeatherContainer.insertAdjacentElement("beforeend",  createWeatherCard(cityName, weatherItem, index));
//       }
     

//     });
   

//   }).catch(() => {
//     alert("Error! cannot get your weather forcast")
//   });

// }

// const getCoordinates = () => {
//   const cityName = City.value.trim();
//   if (!cityName) return;
//   const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;

//   fetch(API_URL).then(res => res.json()).then(data => {
//     if (!data.length) return alert(`cordinate for ${cityName} cannot be found`);
//     // console.log(data)
//     const { name, lat, lon } = data[0];
//     WeatherDetails(name, lat, lon);
//   }).catch(() => {
//     alert("Error! cannot get your location")
//   });


// }

// searchButoon.addEventListener("click", event => {
//   getCoordinates()
//   event.preventDefault();
// });

// Cloned one
