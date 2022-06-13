const fs = require("fs");

const crearArchivo = async (base, listar = false) => {
  try {
    // console.log("===============");
    // console.log("Tabla del: ", base);
    // console.log("===============");

    let data = "";

    for (let i = 1; i <= 10; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }
    listar && console.log(data);

    fs.writeFileSync(`tabla-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (error) {}
};

module.exports = {
  crearArchivo,
};
