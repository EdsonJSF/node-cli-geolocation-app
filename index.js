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
        let placeSelected = places.find((place) => place.id === id);

        // Show results
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad", placeSelected.name);
        console.log("Lat", placeSelected.lat);
        console.log("Lng", placeSelected.lng);
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
