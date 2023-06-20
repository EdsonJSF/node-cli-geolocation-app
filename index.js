require("dotenv").config();

const {
  inquirerMenu,
  pause,
  readInput,
  listChoices,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  const search = new Search();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Show message
        const input = await readInput("Ciudad: ");

        // Find places
        const places = await search.city(input);

        // Select place
        const id = await listChoices(places, "Seleccione lugar");
        if (!id) break;

        let placeSelected = places.find((place) => place.id === id);

        // Save search
        search.addToHistory(placeSelected.name);

        // Weather
        const weather = await search.weatherByLatLng(
          placeSelected.lat,
          placeSelected.lng
        );

        // Show results
        search.showResults(placeSelected, weather);

        break;

      case 2:
        // Show history
        const history = await listChoices(
          search.history,
          "Seleccione historial"
        );
        if (!history) break;

        // Search history
        const historyPlaces = await search.city(history);

        const historyId = await listChoices(historyPlaces, "Seleccione lugar");
        if (!historyId) break;

        let historySelected = historyPlaces.find(
          (place) => place.id === historyId
        );

        // Save search
        search.addToHistory(historySelected.name);

        // Weather
        const historyWeather = await search.weatherByLatLng(
          historySelected.lat,
          historySelected.lng
        );

        // Show results
        search.showResults(historySelected, historyWeather);

        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
