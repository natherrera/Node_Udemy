const { crearArchivo } = require("./helpers/multiplicar");
const { argv } = require("./config/yargs");

crearArchivo(argv.base, argv.listar)
  .then((nombreArchivo) => console.log(nombreArchivo, "creado"))
  .catch((reject) => console.log(reject));

// const [, , arg3] = process.argv;
// const [, base = 5] = arg3.split("=");
