require('dotenv').config();
const express = require('express');
const mongodb = require('./model/database');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app
   .use(express.json())
   .use(session({
         secret: 'secret',
         resave: false,
         saveUninitialized: true,

   }))
   //this is basic express session ({...}) initalization
   .use(passport.initialize())
   //init passport on every route call
   .use(passport.session())
   //allow passport to use express session


   .use((req, res, next) => {
       res.setHeader('Access-control-Allow-origin', '*');
       res.setHeader(
          'Access-Control-Allow-Headers',
          "Origin, X-Requested-with, Content-type, Accept,Z-key"
        );
        res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })

    .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'], origin: '*'}))
    .use(cors({origin: '*'}))
    ;

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || process.env.callbackURL
    },
    function(acessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        //});
    }
))

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.get('/', (req, res) => {res.send (req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'logged out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});


app.use('/', require('./router'));


// Initialize database and start server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
    
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
});



