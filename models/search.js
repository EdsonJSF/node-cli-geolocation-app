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

  async weatherByLatLng(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { main, weather } = resp.data;

      return {
        desc: weather[0].description,
        tmin: main.temp_min,
        tmax: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;
