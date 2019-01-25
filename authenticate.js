var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

var dbconfig = require('./config/database');
var Database = require('./models/database');

var database = new Database(dbconfig.connection);

dotenv.config();

exports.local = passport.use( new LocalStrategy( function(username, password, done){
    // var query = 'SELECT * FROM ACCOUNT WHERE username = ? and password = ?';
    // var params = [username, password];

    // database.query(query, params)
    // .then( results => {
    //     console.log('results: ', results);
    //     if(results && results[0]){
    //         user = {
    //             user_id: results[0].user_id,
    //             username: results[0].username,
    //             account_type: results[0].account_type
    //         };
    //         console.log(user);
    //         return done(null, user);
    //     }
	// })
    // .catch( err => {
    //     console.log('local err:', err);
    //     return done(err);
    // });

    if( username === 'admin' && password === 'password'){
        user = {_id: 58745362, username: 'admin'};
        return done(null, user);
    }

    if( username === 'user' && password === 'password'){
        user = {_id: 58745363, username: 'user'};
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
    return jwt.sign(user, process.env.SECRETKEY, {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

exports.jwtPassport = passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('jwt payload: ', jwt_payload);

    // var query = 'SELECT * FROM ACCOUNT WHERE user_id = ?';
    // var params = [jwt_payload._id];

    // database.query(query, params)
    // .then( results => {
    //     console.log(results);
    //     user = {
    //         user_id: results[0].user_id,
    //         username: results[0].username,
    //         account_type: results[0].account_type
    //     };
    //     if(user)
    //         return done(null, user);
	// })
    // .catch( err => {
    //     console.log(err);
    //     return done(err);
    // });

    if(jwt_payload._id === 58745362){
        user = {_id: 58745362, username: 'admin'};
        return done(null, user);
    }

    if(jwt_payload._id === 58745363){
        user = {_id: 58745363, username: 'user'};
        return done(null, user);
    }
    
    return done(null, false);
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});