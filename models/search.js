const axios = require("axios");

class Search {
  constructor() {
    this.history = ["Madrid", "San José"];
  }

  async city(place = "") {
    try {
      const resp = await axios("https://reqres.in/api/users?page=2");
      console.log(resp.data);
      return resp;
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;
