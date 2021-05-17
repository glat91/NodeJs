const express = require('express');
const router = express.Router();
// Inicio de las request
router.use((req, res, next) => {
    console.log(`${req.url} - ${req.method} - ${req.ip}`);
    next();
})
// En una parte especifica con dato especifico
router.use('/user/:id', function(req, res, next){
    console.log('Request type:', req.method);
    next();
})
// Error
router.use((req, res, next) => {
    next(new Error('Error 333').json({
        code: 3001
    }));
})

module.exports = router;