const axios = require("axios");

class Search {
  constructor() {
    this.history = ["Madrid", "San José"];
  }

  get paramsMapbox() {
    return {
      limit: 5,
      language: "es",
      access_token: mapboxToken,
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      console.log(resp.data);

      return resp;
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;
