#!/usr/bin/env node
require('dotenv').config()
const crypto = require('crypto')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'))

const router = require('./routes/index')

function hash(pass) {
    const hash = crypto.createHash('sha1')
    hash.update(pass)
    return hash.digest('hex')
}

const exampleUser = {
    username: 'user',
    password: hash('pass'),
    email: 'user@example.com',
}

/*passport.use(new BasicStrategy(function(username, password, done) {
    if (username === 'user' && password === 'pass') {
        done(null, {
            username,
            email: 'user@example.com'
        })
    } else {
        done(null, false)
    }
    // User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.validPassword(password)) { return done(null, false); }
    //     return done(null, user);
    // });
}))*/

/*passport.use(new LocalStrategy(function(username, password, done) {
    if (username === exampleUser.username && hash(password) === exampleUser.password) {
        done(null, exampleUser)
    } else {
        done(null, false, { message: 'Invalid login or password.' })
    }
    // User.findOne({ username: username }, function(err, user) {
    //     if (err) { return done(err); }
    //     if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //     }
    //     if (!user.validPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    // });
}))*/

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    //if (username === 'user') {
        done(null, user)
    //} else {
        //done(null, null)
    //}
    /*User.findById(id, function(err, user) {
        done(err, user);
    })*/
})

passport.use(new FacebookStrategy({
        // Pola clientID i clientSecret pobieramy z facebook (po zarejestrowaniu naszej aplikacji)
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, profile)
    }
))



//app.use(express.static("public")); // Publiczne zasoby pozostają nie zabezpieczone
app.use(express.json())
app.use(session({
    secret: "trip_advisor",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
//app.get('/*', passport.authenticate('local', { session: true }), (req, res, next) => next())

/*app.post('/api/login', (req, resp) => {
    return passport.authenticate('local', null, (err, user) => {
        if (user) {
            resp.json(user)
        } else {
            resp.status(401).json({
                error: "niezalogowany"
            })
        }
    })(req, resp)
})*/
app.get('/api/login', (req, resp) => {
    if (req.user) {
        resp.json(req.user);
    } else {
        resp.json({
            error: true,
            message: 'not authorized'
        })
    }
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    function(req, resp) {
        if (req.user) {
            resp.json(req.user);
        } else {
            resp.json({
                error: true,
                message: 'not authorized'
            })
        }
    });

app.use('/', router)


app.listen(3000, () => {
    console.log("TripApp started")
})
