const zabbix = require('zabbix-node');
const zabbixServer = require('../config').zabbix;

var client = new zabbix(zabbixServer.url, zabbixServer.user, zabbixServer.password);

const alertController = {};

alertController.get = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var method = 'alert.get';
    var params = {
        'output': 'extend'
    }

    client.login(function(error, resp, body) {

        if(error){
            console.log(error);
            res.json(error)
        }

        console.log('Login');
        client.call(method, params, function(error, resp, body) {

            if(error){
                console.log(error);
                res.json(error)
            }

            console.log(body);
            res.json(body);
        });
    });
}
alertController.post = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /hosts');
}
alertController.put = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /hosts');
}
alertController.delete = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /hosts');
}

alertController.getById = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var method = 'alert.get';
    var params = {
        'hostids': req.params.id,
        'output': 'extend'
    }

    client.login(function(error, resp, body) {

        if(error){
            console.log(error);
            res.json(error)
        }

        console.log('Login');
        client.call(method, params, function(error, resp, body) {

            if(error){
                console.log(error);
                res.json(error)
            }

            console.log(body);
            res.json(body[0]);
        });
    });
}
alertController.postById = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /hosts');
}
alertController.putById = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /hosts');
}
alertController.deleteById = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /hosts');
}

module.exports = alertController;