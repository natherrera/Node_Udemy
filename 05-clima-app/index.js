require('dotenv').config();

const {
    leerInput,
    inquireMenu,
    pausa,
    listarLugares
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {

    const busquedas = new Busquedas();

    let opt = "";

    do {
        console.clear();
        //Imprimir el menú
        opt = await inquireMenu();

        switch (opt) {
            case 1: // Buscar ciudad
                const termino = await leerInput("Ciudad:");
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);

                if (id === '0') continue

                const {
                    nombre,
                    lat,
                    lng
                } = lugares.find(l => l.id === id);

                //Guardar en DB
                busquedas.agregarHistorial(nombre)

                const {
                    temp, min, max, desc
                } = await busquedas.climaLugar(lat, lng);

                console.clear()
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', nombre.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', temp)
                console.log('Mínima:', min)
                console.log('Máxima:', max)
                console.log('¿Cómo esta el clima?:', desc.green)
                break;

            case 2: // Historial
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`)

                })

                break;

        }
        await pausa();
    } while (opt !== "0");
}


main();