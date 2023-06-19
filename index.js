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
        const id = await listChoices(places);
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
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", placeSelected.name);
        console.log("Lat:", placeSelected.lat);
        console.log("Lng:", placeSelected.lng);
        console.log("Temperatura:", weather.temp);
        console.log("Temp mínima:", weather.tmin);
        console.log("Temp máxima:", weather.tmax);
        console.log("Cómo está el clima:", weather.desc);
        break;

      case 2:
        const historySelected = await listChoices(search.history);
        console.log(historySelected);

        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
