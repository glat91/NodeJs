// Basico
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Rutas import
const routes = require('../routes/index');
const middle = require('../routes/middle');
// Settings variables de sistema
app.set('port', process.env.PORT || 3000); // Que use el puerto predefinido sino el 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* 
                Middlewares 
*/
//app.use(express.jclsson()); // Uso de json No funciona
app.use(bodyParser.json()); // Uso de json
app.use(bodyParser.urlencoded({extended: false})); // recibir en url
app.use('/api/', middle); // Personalizados
app.use(morgan('dev')) // Como flask imprime en consola todo lo que sucede
// Rutas
app.use('/api/', routes); // Empiezan con Api
//static files .js, .css
app.use(express.static(path.join(__dirname, 'public')))
// Start Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})