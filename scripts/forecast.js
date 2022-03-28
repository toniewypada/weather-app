class Forecast {
  constructor() {
    this.key = "HAcwd90ptkxNMAKlPHPUckNdjLN0PCyZ";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updatecity(city) {
    const cityDetails = await this.getCity(city);
    const weatherForecast = await this.getWeather(cityDetails.Key);

    return { cityDetails, weatherForecast };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURI + query);
    const data = await response.json();

    return data[0];
  }
  async getWeather(locationKey){
    const query = `${locationKey}?apikey=${this.key}`;
  
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
  
    return data[0];
  }
}
