console.log(
  "What's the point of small talk if you can't talk about the weather?"
);

// const apiKey = "1ae8c9811bb69f7be6fcc44e1975262c";
// http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid="

window.addEventListener("load", () => {
  const apiKey = "1ae8c9811bb69f7be6fcc44e1975262c";
  let long;
  let lat;
  let weatherContainer = document.querySelector(".weather-info-container");
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherCity = document.querySelector(".weather-city p");
  let weatherDescription = document.querySelector(".weather-description p");
  let weatherUnits = document.querySelector(".units h2");

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
          console.log("kelvinTemp ", kelvinTemp);

          let unitOfMeasurement = "Fahrenheit";
          weatherCity.innerHTML = cityName;
          weatherDescription.innerHTML = description;

          function KtoF(kelvinTemp) {
            unitOfMeasurement = "Celsius";
            return Math.floor(((kelvinTemp - 273) * 9) / 5 + 32);
          }

          function KtoC(kelvinTemp) {
            unitOfMeasurement = "Fahrenheit";
            return Math.floor(kelvinTemp - 273.15);
          }

          weatherTemperature.innerHTML = `${KtoF(kelvinTemp)}x<span>F</span>`;

          console.log(data);
          weatherContainer.addEventListener("click", function() {
            console.log("unitOfMeasurement ", unitOfMeasurement);

            if (data.name === undefined) return;

            if (unitOfMeasurement == "Fahrenheit") {
              weatherTemperature.innerHTML = `${KtoF(
                kelvinTemp
              )}<span>F</span>`;
            } else {
              weatherTemperature.innerHTML = `${KtoC(
                kelvinTemp
              )}<span>C</span>`;
            }
          });
        });
    });
  }
});
