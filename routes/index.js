const express = require('express');
const { path } = require('path');
const router = express.Router();
//const indexController = require()
/*
                Rutas Syncronas
*/
// Forma Basica esto se pasara a controllers
router.get('/', (req, res) => {
    res.render('index', {
        pasarVariable: "pasar variable" // forma de pasar datos entre ventanas
    })
});
// Diferentes datos de los request
router.post('/loggin/:userId', (req, res) =>{
    const userId = req.params || {}; // Chequeo si exsiste
    const test = req.query || {}; // Obtener cadena creada
    const {name, age} = req.body || {}; // body de la peticion
    
    const ip = req.ip; // Obtener Ip
    const contentType = req.headers['content-type'] // regresa los diferentes headers
    const cookie = req.cookies; // Obtenemos los cookies

    req.json({
        id: userId, // por urlEncode
        nombre: name,
        edad : age
    })
})
// Status
router.get('/status', (req, res) => {
    res.status(333).json({ // Envia el status con mensaje
        error: 'Accseso denegado',
        code: 74456
    })
    //res.sendStatus(401); // Envia solo el status
})
// Enviar Header personalizado
router.get('/headder-send', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
        'mi-cache': 'valor propio'
    }).json({
        status: 'ok'
    })
})
// Redireccionar
router.get('/redirect', (req, res) => {
    res.redirect('https://www.google.com')
})
// Mandar Archivo
router.get('/send-txt', (req, res) => {
    res.download(__dirname + 'nobre_archivo.txt'); // se agrega el path del archivo
})
/*
            Rutas Asyncronas No funciona
*/
// Primero se tiene q crear la funcion asyncrona
async function sleep(ms){
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
    //return new Promise((resolve, reject) => setTimeout(reject(new Error('Problema en el servidor')), ms)) // Mandar error
}
// Segundo se declara el routeHelper Para manejo de errores
async function routeHelper(callback){
    return async (req, res) => { // Regresamos una funcion asyncrona que recibe los parametros comunes de las rutas en las que se usara
        try{
            await callback(req, res);
        }
        catch(error){
            res.status(400).json({
                status: error // Verificar error antes de enviarlo
            });
        }
    }   
}
// Se usa en la ruta
router.get('/', routeHelper(async(req, res) => {
    await sleep(500);
    res.json({
        statur: 'Ok'
    });
}));

// Export para uso
module.exports = router;