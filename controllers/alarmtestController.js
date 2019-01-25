const fs = require('fs');

const soapRequest = require('easy-soap-request');
var parseString = require('xml2js').parseString;

var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const alarmtestController = {};

alarmtestController.get =async function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    query = 'SELECT * FROM ALARMAS';
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
alarmtestController.post = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /alarm');
}
alarmtestController.put = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /alarm');
}
alarmtestController.delete = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /alarm');
}



module.exports = alarmtestController;