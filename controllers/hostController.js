const fs = require('fs');

const soapRequest = require('easy-soap-request');
var parseString = require('xml2js').parseString;

const U2000Server = require('../config').U2000;

var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const hostController = {};

const PLACEHOLDER_U2000_USER = '?u2000user?'
const PLACEHOLDER_U2000_PASSWORD = '?u2000password?'

hostController.get =async function(req, res, next){

    res.setHeader('Content-Type', 'application/json');

    const url = `${U2000Server.host}:${U2000Server.port}/ManagedElementRetrieval`
    console.log(url);
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
    };
    var xml = fs.readFileSync('xml/hostEnvelope.xml', 'utf-8');
    xml = xml.replace(PLACEHOLDER_U2000_USER, U2000Server.user);
    xml = xml.replace(PLACEHOLDER_U2000_PASSWORD, U2000Server.password);

    try {
        const { response } = await soapRequest(url, headers, xml, 10000); // Optional timeout parameter(milliseconds)
        const { body, statusCode } = response;
        res.statusCode = statusCode;
        parseString(body, async function (err, result) {
            result = result['soap:Envelope']['soap:Body'][0]['ns4:getAllManagedElementsResponse'][0]['ns4:meList'][0]['ns11:me']
            hosts = []
            for(var i = 0; i < result.length; ++i){
                row = result[i]
                host = {}
                host['ID'] = row['ns9:name'][0]['ns3:rdn'][1]['ns3:value'][0];
                host['NEName'] = row['ns9:aliasNameList'][0]['ns2:alias'][0]['ns2:aliasValue'][0];
                host['NEType'] = row['ns11:productName'][0];
                host['NEIPAddress'] = row['ns11:ipaddress'][0];
                host['NEMac'] = '';
                host['creationTime'] = '';
                host['fiberCableCount'] = '';
                host['Remarks'] = '';
                host['type'] = '';

                var query = 'SELECT * FROM HOSTBYNODO WHERE host_id = ?';
                var params = [host['ID']];

                await database.query(query, params)
                .then( results => {
                    console.log(results);
                    host['nodo_id'] = results[0]['nodo_id'];
                    host['type'] = results[0]['type_host'];
                })
                .catch( err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.json( { error: err } );
                });

                hosts.push(host);
            }

            //Envio de Host u2k
            host = {}
                host['ID'] = '123456';
                host['NEName'] = 'U2000 Huawei';
                host['NEType'] = 'U2000';
                host['NEIPAddress'] = '10.123.106.51';
                host['NEMac'] = '';
                host['creationTime'] = '';
                host['fiberCableCount'] = '';
                host['Remarks'] = 'u2000';
                host['type'] = 'IP';
                host['nodo_id'] ='4';

            hosts.push(host);

            console.log(hosts);
            res.json(hosts);
        });
    } catch (error) {
        res.statusCode = 500;
        res.json({error: error});
    }
}
hostController.post = function(req, res, next){
    console.log('post machinery');

    var query = 'SELECT * FROM DNI WHERE dni_code=?';
    var params = [req.body.dni_code];

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
hostController.put = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /hosts');
}
hostController.delete = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /hosts');
}

hostController.getById = async function(req, res, next){
    const { id } = req.params;
    console.log('get data DNI from %d', id);
  

    var query = 'SELECT * FROM DNI WHERE dni_code= ? ';
    var params = [id];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.json( results[0] );
	})
    .catch(err => {
        console.log(err);
        res.json( { error: err } );
	})
}
hostController.postById = function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /hosts');
}
hostController.putById = function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /hosts');
}
hostController.deleteById = function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /hosts');
}

module.exports = hostController;