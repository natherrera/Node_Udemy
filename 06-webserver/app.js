const express = require('express')
const app = express()
const hbs = require('hbs');
require('dotenv').config();



const port = process.env.PORT;


//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Natalia Herrera',
        titulo: 'Curso de node'
    });
})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Natalia Herrera',
        titulo: 'Curso de node'
    })
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Natalia Herrera',
        titulo: 'Curso de node'
    })
})

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})