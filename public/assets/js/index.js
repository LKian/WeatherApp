

console.log(
  "What's the point of small talk if you can't talk about the weather?"
);

window.addEventListener("load", () => {
  const apiKey = "1ae8c9811bb69f7be6fcc44e1975262c";
  let long;
  let lat;
  let weatherContainer = document.querySelector(".weather-info-container");
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherCity = document.querySelector(".weather-city p");
  let weatherDescription = document.querySelector(".weather-description p");
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherUnits = document.querySelector(".units");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(api)
        .then(response => {
          return response.json();
        })

        .then(data => {
          // console.log(data);
          const cityName = data.name;
          const description = data.weather[0].description;
          const kelvinTemp = data.main.temp;
          const icon = data.weather[0].icon;
          console.log("kelvinTemp ", kelvinTemp);

          let unitOfMeasurement ;
          weatherCity.innerHTML = cityName;
          weatherDescription.innerHTML = description;
          weatherIcon.innerHTML = `<img src="assets/css/icons/${icon}.png"/>`;

          function KtoF(kelvinTemp) {
            unitOfMeasurement = "F";
            weatherUnits.innerHTML = unitOfMeasurement;
            return Math.floor(((kelvinTemp - 273) * 9) / 5 + 32);
          }

          function KtoC(kelvinTemp) {
            unitOfMeasurement = "C";
            weatherUnits.innerHTML = unitOfMeasurement;
            return Math.floor(kelvinTemp - 273.15);
          }
          
          weatherTemperature.innerHTML = `${KtoF(kelvinTemp)}`;
          weatherUnits.innerHTML = unitOfMeasurement;

          console.log(data);
          weatherContainer.addEventListener("click", function() {
            console.log("unitOfMeasurement ", unitOfMeasurement);

            if (data.name === undefined) return;

            if (unitOfMeasurement == "C") {
              weatherTemperature.innerHTML = `${KtoF(
                kelvinTemp
              )}`;
            } else {
              weatherTemperature.innerHTML = `${KtoC(
                kelvinTemp
              )}`;
            }
          });
        });
    });
  }
});
