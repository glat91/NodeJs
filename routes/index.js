const express = require('express');
const { path } = require('path');
const router = express.Router();
/*
                Synchronous Rute
*/
// Forma Basica esto se pasara a controllers
router.get('/', (req, res) => {
    res.render('index', {
        passVar: "Data Sending" // Way to pass values between pages
    })
});
// Diffrents type of data recive
router.post('/loggin/:userId', (req, res) =>{
    const userId = req.params || {}; // Verify if params exsist
    const test = req.query || {}; // Get string created
    const {name, age} = req.body || {}; // Body request
    
    const ip = req.ip; // Get Ip
    const contentType = req.headers['content-type'] // Get headers
    const cookie = req.cookies; // Get Cookies

    req.json({
        id: userId,
        nombre: name,
        edad : age
    })
})
// Status
router.get('/status', (req, res) => {
    res.status(333).json({ // Send Status with message
        error: 'Accseso denegado',
        code: 74456
    })
    //res.sendStatus(401); // Send Only Status
})
// Send own header
router.get('/header-send', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
        'mi-cache': 'valor propio'
    }).json({
        status: 'ok'
    })
})
// Redirect
router.get('/redirect', (req, res) => {
    res.redirect('https://www.google.com')
})
// Send file
router.get('/send-txt', (req, res) => {
    res.download(__dirname + 'nobre_archivo.txt'); // se agrega el path del archivo
})
/*
            Asynchronous Routes
*/
// Async Function
async function sleep(ms){
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
// Route Helper for Error Manage
async function routeHelper(callback){
    return async (req, res) => {
        try{
            await callback(req, res);
        }
        catch(error){
            res.status(400).json({
                status: error
            });
        }
    }   
}
router.get('/', routeHelper(async(req, res) => {
    await sleep(500);
    res.json({
        statur: 'Ok'
    });
}));

module.exports = router;
