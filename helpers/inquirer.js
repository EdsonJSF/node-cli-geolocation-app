const inquirer = require("inquirer");
require("colors");

const menuOpt = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1.".green} Buscar ciudad` },
      { value: 2, name: `${"2.".green} Historial` },
      { value: 0, name: `${"0.".green} Salir\n` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Seleccione una opción".green);
  console.log("===========================\n".green);

  const { option } = await inquirer.prompt(menuOpt);
  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor";
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const createChoices = (places = [], checked = false) => {
  return (choices = places.map((place, index) => {
    const i = `${index + 1}.`.green;
    const choice = { value: place.id, name: `${i} ${place.name}` };
    if (checked) choice.checked = !!place.completeDate;
    return choice;
  }));
};

const createQuestion = (type, name, message, choices) => {
  return [{ type, name, message, choices }];
};

const listChoices = async (places = [], message = "Selecione") => {
  const choices = createChoices(places);
  choices.unshift({ value: false, name: `${"0.".green} No! Quiero salir` });
  const question = createQuestion("list", "id", message, choices);

  const { id } = await inquirer.prompt(question);
  return id;
};

const listCheckChoices = async (tasks = []) => {
  const choices = createChoices(tasks, true);
  const question = createQuestion("checkbox", "ids", "Selecciones", choices);

  const { ids } = await inquirer.prompt(question);
  return ids;
};

const comfirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Precione ${"ENTER".green} para continuar`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
};

module.exports = {
  comfirm,
  inquirerMenu,
  listCheckChoices,
  listChoices,
  pause,
  readInput,
};
