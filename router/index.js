const router = require('express').Router();
const passport = require('passport')

// Swagger docs
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['hello world]
    res.send('welcome to Ameiz home page');
})

router.use('/subscribers', require('./subscriber'));

router.use('/customers', require('./customers'))

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }), (req, res) =>{});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) { return next(err);}
        res.redirect('/');
    });
});

module.exports = router;