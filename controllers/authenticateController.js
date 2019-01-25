const passport = require('passport');

var authenticate = require('../authenticate');
const authenticateController = {};

authenticateController.get = function(req, res, next){
    res.statusCode = 403;
    res.json({
        error: 'GET operation not supported on /authenticate'
    });
};

authenticateController.post = function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log('err: ', err);
            return next(err);
        }
        
        if(!user){
            console.log('info: ', info);
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json( { success: false, status: "Login unsucessfull", error: info } ); 
        }
        else{
            req.logIn(user, (err) => {
                if(err){
                    console.log('error: ', err);
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, status: "Login unsucessful", error: err});
                }

                console.log('succesfull inside');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                var token = authenticate.getToken({_id: req.user._id});
                res.json( { success: true, token: token, status: "You are sucessfully logged in!" } );
            });
        }

    }) (req, res, next);
};

authenticateController.put = function(req, res, next){
    res.statusCode = 403;
    res.json({  
        error: 'PUT operation not supported on /authenticate'
    });
};

authenticateController.delete = function(req, res, next){
    res.statusCode = 403;
    res.json({
        error: 'DELETE operation not supported on /authenticate'
    });
};

authenticateController.checkJWTToken = function(req, res, next){
    passport.authenticate('jwt', { session: false }, (err, user, ) => {
        if(err)
            return next(err);
        
        if(!user){
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json( { success: false, status: "JWT invalid"} );
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json( { success: true, status: "JWT valid", user: user } );
        }
    }) (req, res, next)
}

module.exports = authenticateController;