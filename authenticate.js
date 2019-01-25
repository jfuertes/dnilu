var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use( new LocalStrategy( function(username, password, done){
    err = false;
    if(err)
        return done(err)
    if( username === 'admin' && password === 'password'){
        user = {_id: 58745362, username: 'admin'};
        return done(null, user);
    }
    return done(null, false)
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

exports.getToken = function(user){
    return jwt.sign(user, config.api.secretKey, {expiresIn: config.api.tokenExpires});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.api.secretKey;

exports.jwtPassport = passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('jwt payload: ', jwt_payload);
    err = false;
    if(err)
        return done(err);
    if(jwt_payload._id === 58745362){
        user = {_id: 58745362, username: 'admin'};
        return done(null, user);
    }
    return done(null, false);
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});