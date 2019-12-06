console.log("What's small talk without weather?");

window.addEventListener("load", () => {
  const apiKey = "1ae8c9811bb69f7be6fcc44e1975262c";
  let long, lat;
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
          const cityName = data.name;
          const countryName = data.sys.country;
          const description = data.weather[0].description;
          const kelvinTemp = data.main.temp;
          const icon = data.weather[0].icon;
          console.log("City: " + cityName + ", " + countryName);

          let unitOfMeasurement;
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

          weatherContainer.addEventListener("click", function() {
            if (data.name === undefined) return;

            if (unitOfMeasurement == "C") {
              weatherTemperature.innerHTML = `${KtoF(kelvinTemp)}`;
              console.log(
                weatherTemperature.innerHTML + "°",
                unitOfMeasurement
              );
            } else {
              weatherTemperature.innerHTML = `${KtoC(kelvinTemp)}`;
              console.log(
                weatherTemperature.innerHTML + "°",
                unitOfMeasurement
              );
            }
          });
        });
    });
  }
});
