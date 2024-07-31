const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8080;
app.use(express.json());

const cors = require('cors');
app.use(cors());
const userModel = require('./Models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const path = require('path');

const authRoutes = require('./Routes/auth');
const bookRoutes = require('./Routes/book');

mongoose.connect('mongodb+srv://rathoresanchit786:SuzSTUIcrLDKMEpR@cluster0.jy5kv3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {}).then((e)=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Unable to Connect to MONGODB', err);
});

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.get('/', function (req,res){
    res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);

app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
    console.log('app running on', port);
});

// SuzSTUIcrLDKMEpR

