const zabbix = require('zabbix-node');
const zabbixServer = require('../config').zabbix;

var client = new zabbix(zabbixServer.url, zabbixServer.user, zabbixServer.password);

const eventController = {};

// events
eventController.get=function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    client.login(function(error, resp, body) {
        if(error){
            console.log(error);
            res.json(error)
        }

        client.call('event.get', {'output': 'extend'}, function(error, resp, body) {
            if(error){
                console.log(error);
                res.json(error);
            }
            console.log(body);
            res.json(body);
        });
    });
}
eventController.post=function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /events');
}
eventController.put=function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
}
eventController.delete=function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /events');
}

// events/:id
eventController.getById = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    client.login(function(error, resp, body) {
        if(error){
            console.log(error);
            res.json(error);
        }
        client.call('event.get', {'output': 'extend', 'eventids': req.params.id}, function(error, resp, body) {
            if(error){
                console.log(error);
                res.json(error);
            }
            console.log(body);
            res.json(body[0]);
        });
    });
}
eventController.postById = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /events');
}
eventController.putById = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
}
eventController.deleteById = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /events');
}


// events/host/:id
eventController.getByHostId = function(req, res, next){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    client.login(function(error, resp, body) {
        client.call('event.get', {'output': 'extend', 'hostids': req.params.hostId}, function(error, resp, body) {
          console.log(body);
          res.json(body[0]);
        });
    });
}
eventController.postByHostId = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /events');
}
eventController.putByHostId = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
}
eventController.deleteByHostId = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /events');
}

module.exports = eventController;