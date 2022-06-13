require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("============================".green);
    console.log("Seleccione una opción:".green);
    console.log("============================".green);
    console.log(`${"1.".green} Mostrar mensaje`.green);
    console.log(`${"2.".green} Listar tareas`.green);
    console.log(`${"3.".green} Listar tareas completadas`.green);
    console.log(`${"4.".green} Listar tareas pendientes`.green);
    console.log(`${"5.".green} Completar tarea(s)`.green);
    console.log(`${"6.".green} Borrar tarea`.green);
    console.log(`${"0.".green} Salir \n`.green);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Seleccione una opción: ", (opt) => {
      console.log({ opt });
      readLine.close();
      resolve(opt);
      return opt;
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = { mostrarMenu, pausa };
