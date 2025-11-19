const router = require('express').Router();

// Swagger docs
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['hello world]
    res.send('welcome to Ameiz home page');
})

router.use('/subscribers', require('./subscriber'));

module.exports = router;