var authenticate = require('../authenticate');
const authenticateController = {};

authenticateController.get = function(req, res, next){
    res.statusCode = 403;
    res.json({
        error: 'GET operation not supported on /authenticate'
    });
}
authenticateController.post = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var token = authenticate.getToken({_id: req.user._id});
    res.json({success: true, token: token, status: "You are sucessfully logged in!"}); 
}
authenticateController.put = function(req, res, next){
    res.statusCode = 403;
    res.json({
        error: 'PUT operation not supported on /authenticate'
    });
}
authenticateController.delete = function(req, res, next){
    res.statusCode = 403;
    res.json({
        error: 'DELETE operation not supported on /authenticate'
    });
}

module.exports = authenticateController;