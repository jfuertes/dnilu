const fs = require('fs');

const soapRequest = require('easy-soap-request');
var parseString = require('xml2js').parseString;

const U2000Server = require('../config').U2000;

const alarmController = {};

const PLACEHOLDER_U2000_USER = '?u2000user?'
const PLACEHOLDER_U2000_PASSWORD = '?u2000password?'

// events
alarmController.get = async function(req, res, next){

    const url = `${U2000Server.host}:${U2000Server.port}/AlarmRetrieval`;
    console.log(url);
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
    };
    var xml = fs.readFileSync('xml/alarmEnvelope.xml', 'utf-8');
    xml = xml.replace(PLACEHOLDER_U2000_USER, U2000Server.user);
    xml = xml.replace(PLACEHOLDER_U2000_PASSWORD, U2000Server.password);

    try {
        const { response } = await soapRequest(url, headers, xml, 10000); // Optional timeout parameter(milliseconds)
        const { body, statusCode } = response;
        res.statusCode = statusCode;
        parseString(body, async function (err, result) {
            result = result['soap:Envelope']['soap:Body'][0]['ns3:getActiveAlarmsResponse'][0]['ns9:alarm']
            alarms = []
            console.log(result.length);
            for(var i = 0; i < result.length; ++i){
                row = result[i];

                alarm = {};

                alarm['ID'] = row['ns7:notificationId'][0];
                alarm['AlarmMOName'] = row['ns9:aliasNameList'][0]['ns2:alias'][0]['ns2:aliasValue'][0];
                alarm['AlarmNEDevID'] = row['ns8:objectName'][0]['ns4:rdn'][1]? row['ns8:objectName'][0]['ns4:rdn'][1]['ns4:value'][0]: '123456';
                alarm['AlarmSource'] = row['ns9:X733_EventType'][0];
                alarm['AlarmType'] = row['ns9:perceivedSeverity'][0];
                alarm['AlarmOccurTime'] = row['ns7:sourceTime'][0];
                alarm['AlarmDevCsn'] = '';
                alarm['Alarmcategory'] = row['ns9:X733_EventType'][0];
                alarm['AlarmConfirm'] = row['ns9:acknowledgeIndication'][0]
                alarm['AlarmRestore'] = row['ns9:isClearable'] ? 'cleared': 'uncleared';
                alarm['AlarmProbableCause'] = row['ns9:probableCause'][0]['ns6:probableCause'];
                alarm['AlarmSpecificProblems'] = row['ns9:X733_SpecificProblems'][0]['ns5:specificProblem'];

                
                //if(alarm['AlarmNEDevID'] == 123456) continue;

                alarms.push(alarm);
                
            }
            console.log(alarms);
            res.json(alarms);
        });
    } catch (error) {
        res.statusCode = 500;
        res.json({error: error});
    }

}

alarmController.post=function(req, res, next){
    res.statusCode = 403;
    res.end('POST operation not supported on /alarms');
}
alarmController.put=function(req, res, next){
    res.statusCode = 403;
    res.end('PUT operation not supported on /alarms');
}
alarmController.delete=function(req, res, next){
    res.statusCode = 403;
    res.end('DELETE operation not supported on /alarms');
}

module.exports = alarmController;