const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const weatherDetails = document.querySelector(".details");
const timeIndicator = document.querySelector("img.time");
const weatherIcon = document.querySelector(".icon img");
const forecast = new Forecast();


const updateUI = (data) => {
  const { cityDetails, weatherForecast } = data;


  weatherDetails.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weatherForecast.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weatherForecast.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;

  const iconSource = `img/icons/${weatherForecast.WeatherIcon}.svg`;
  weatherIcon.setAttribute("src", iconSource);

  let timeSource = weatherForecast.IsDayTime ? "img/day.svg" : "img/night.svg";
  timeIndicator.setAttribute("src", timeSource);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCityWeather = async (city) => {
  const cityDetails = await forecast.getCity(city);
  const weatherForecast = await forecast.getWeather(cityDetails.Key);

  return { cityDetails, weatherForecast };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCityWeather(city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error));

    //set local storage 
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCityWeather(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(error => console.log(error))
}