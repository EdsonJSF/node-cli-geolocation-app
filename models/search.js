const axios = require("axios");

class Search {
  constructor() {
    this.history = ["Madrid", "San José"];
  }

  async city(place = "") {
    try {
      const resp = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=5&language=es&access_token=${mapboxToken}`);
      console.log(resp.data);
      return resp;
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;
