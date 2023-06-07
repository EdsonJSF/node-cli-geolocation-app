const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  const search = new Search();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const input = await readInput("Ciudad: ");
        search.city(input);
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
