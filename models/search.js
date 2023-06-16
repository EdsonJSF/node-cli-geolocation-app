const axios = require("axios");

class Search {
  constructor() {
    this.history = ["Madrid", "San José"];
  }

  get paramsMapbox() {
    return {
      limit: 5,
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get paramsOpenWeather() {
    return {
      units: "metric",
      lang: "es",
      appid: process.env.OPENWEATHER_KEY,
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }
  async weather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
        params: this.paramsOpenWeather,
      });

      const { data } = await instance.get();

      return {
        desc: data.weather[0].description,
        tmin: data.main.temp_min,
        tmax: data.main.temp_max,
        temp: data.main.temp,
      };
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;
