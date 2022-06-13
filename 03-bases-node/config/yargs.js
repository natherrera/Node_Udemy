const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    desc: "Base de la tabla",
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    demandOption: true,
    default: false,
    desc: "Listar la tabla",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw new Error("La base no puede ser negativa");
    }
    return true;
  }).argv;

module.exports = {
  argv,
};
