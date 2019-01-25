var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const nodeController = {};

nodeController.get = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    query = 'SELECT * FROM NODOS';
    database.query(query)
    .then( results => {
        console.log(results);
        res.json(results)
    })
    .catch( err => {
        console.log(err);
        res.statusCode = 500;
        res.json( { error: err } );
    });
}

nodeController.post = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /nodos');
}
nodeController.put = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /nodos');
}
nodeController.delete = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /nodos');
}

nodeController.getById = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    query = 'SELECT * FROM NODOS WHERE id ="'+ req.params.id + '"'

    database.query(query)
    .then( results => {
        console.log(results);
        res.json(results[0])
    })
    .catch( err => {
        console.log(err);
        res.statusCode = 500;
        res.json( { error: err } );
    });

}

nodeController.postById = function(req, res, next){
    console.log('post wisolab');

    var query = 'INSERT dni ( dni_code, user ) values (  ?, ? )'
    var params = [req.body.dni_code, req.body.user];

    database.query(query, params)
    .then( results => {
        console.log(results);
        res.json( { success: true, "dbResponse": results } );
	})
    .catch( err => {
        console.log(err);
        res.json( { error: err } );
	})
}
nodeController.putById = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /nodos');
}
nodeController.deleteById = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /nodos');
}


module.exports = nodeController;