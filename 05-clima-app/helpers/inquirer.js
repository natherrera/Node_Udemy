const inquirer = require("inquirer");
require("colors");

const questions = [{
  type: "list",
  name: "opcion",
  message: "¿Qué desea hacer?",
  choices: [{
      value: 1,
      name: `${"1.".green} Buscar ciudad`,
    },
    {
      value: 2,
      name: `${"2.".green} Historial`,
    },
    {
      value: 3,
      name: `${"0.".green} Salir`,
    },
  ],
}, ];

const inquireMenu = async () => {
  console.log("============================".green);
  console.log("Seleccione una opción:".white);
  console.log("============================".green);

  const {
    opcion
  } = await inquirer.prompt(questions);
  return opcion;
};

const pausa = async () => {
  console.log("\n");
  const continueInput = [{
    type: "input",
    name: "pausa",
    message: `Presione ${"ENTER".green} para continuar\n`,
  }, ];
  const {
    pausa
  } = await inquirer.prompt(continueInput);
  return pausa;
};

const leerInput = async (message) => {
  const question = [{
    type: "input",
    name: "desc",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Debe ingresar una valor";
      }
      return true;
    },
  }, ];

  const {
    desc
  } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {

  const choices = lugares.map((lugar, i) => {

    const idx = `${i + 1}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [{
    type: "list",
    name: "id",
    message: "Seleccione un lugar",
    choices,
  }, ];

  const {
    id
  } = await inquirer.prompt(preguntas);
  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [{
    type: "checkbox",
    name: "ids",
    message: "Selecciones",
    choices,
  }, ];
  const {
    ids
  } = await inquirer.prompt(pregunta);
  return ids;
};

const confirmar = async (message) => {
  const question = [{
    type: "confirm",
    name: "ok",
    message,
  }, ];

  const {
    ok
  } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquireMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};