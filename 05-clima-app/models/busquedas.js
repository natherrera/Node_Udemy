const fs = require('fs')
var lodash = require('lodash');
const axios = require('axios')

class Busquedas {
    historial = []
    dbPath = './db/database.json'

    constructor() {
        console.log('first')
        //TODO: leer db si existe
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => lodash.capitalize(p));

            return palabras.join(' ')

        })
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        }
    }
    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        }
    }

    async ciudad(lugar = '') {
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const {
                data: {
                    features
                }
            } = await instance.get();
            return features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.error(error)
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            })

            const {
                data: {
                    main: {
                        temp,
                        temp_min,
                        temp_max
                    },
                    weather: [{
                        description
                    }]
                }
            } = await instance.get();

            return {
                desc: description,
                min: temp_min,
                max: temp_max,
                temp
            }
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {
        //TODO: prevenir duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) return

        this.historial = this.historial.splice(0, 5)

        this.historial.unshift(lugar.toLocaleLowerCase())

        //Grabar en DB
        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {
            encoding: 'utf-8'
        })

        const {
            historial
        } = JSON.parse(info);

        this.historial = historial;
    }
}

module.exports = Busquedas;