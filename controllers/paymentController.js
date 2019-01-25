var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const controller = {};

// addUser (post)
controller.Paymentpost=function(req, res) {
    console.log('start:Machinerypost');
    connection.query('USE ' + dbconfig.database);
    var newUserMysql = new Object();
    newUserMysql.machinery_type     =req.body.machinery_type;
    newUserMysql.id_user   =req.body.id_user;
    newUserMysql.auto_payment  =req.body.auto_payment;
    var insertQuery = 'INSERT MACHINERY ( machinery_type,id_user,auto_payment) values ('+ newUserMysql.machinery_type +','+ newUserMysql.id_user +',"'+ newUserMysql.auto_payment +'")';
    
    connection.query(insertQuery,function(err){
        if (err){
            console.log(err);
            
            res.send('ERROR_INSERT_DATABASE')
        }
        else{
            res.send('OK')                    
        }
    });	
}
// Lista de Usarios
controller.Paymentget = (req, res) => {
    console.log('start:Usersget');
    var insertQuery = 'SELECT * FROM MACHINERY';
    connection.query('USE ' + dbconfig.database);
    connection.query(insertQuery,function(err,results){
        if (err){
            console.log(err);
            
            res.send('ERROR_INSERT_DATABASE')
        }
        else{
            res.send(results)                    
        }
    });
}

// Lista de Usario por ID
controller.PaymentIdget = (req, res) => {
    console.log('start:MachineryIdget');
    const { id } = req.params;
    var insertQuery = 'SELECT * FROM MACHINERY WHERE id ='+id;
    connection.query('USE ' + dbconfig.database);
    connection.query(insertQuery,function(err,results){
        if (err){
            console.log(err);
            res.send('ERROR_INSERT_DATABASE')
        }
        else{
            res.send(results[0])                    
        }
    });
}

// Metodo Delete de Usario por ID
controller.PaymentIddelete = (req, res) => {
    console.log('start:MachineryIddelete');
    const { id } = req.params;
    var insertQuery = 'DELETE FROM MACHINERY WHERE id ='+id;
    console.log(insertQuery);
    connection.query('USE ' + dbconfig.database);

    connection.query(insertQuery,function(err,results){
        if (err){
            console.log(err);
            
            res.send('ERROR_INSERT_DATABASE')
        }
        else{
            res.send('OK')
        }
    });
}

// Metodo Put de Usario por ID
controller.PaymentIdput=function(req, res) {
    console.log('start:MachineryIdput');
    const { id } = req.params;
    var query= "SELECT * FROM MACHINERY WHERE id = '"+id+"'";
    connection.query('USE ' + dbconfig.database);
    connection.query(query,function(err,rows){
        console.log('rows='+rows);
        console.log('error='+err);
        if (err){
            res.send('error_database')
        }
        
        else if (rows.length <1) {
            res.send('error no existe dato')
        } 
        else {
            var newUserMysql = new Object();
            newUserMysql.machinery_type     =req.body.machinery_type;
            newUserMysql.id_user   =req.body.id_user;
            newUserMysql.auto_payment  =req.body.auto_payment;
            var insertQuery = 'UPDATE USERS SET machinery_type= "'+ newUserMysql.machinery_type +'",id_user="'+ newUserMysql.id_user +'",auto_payment="'+ newUserMysql.auto_payment +'" WHERE id='+id;
            
            
            connection.query(insertQuery,function(err){
                if (err){
                    console.log(err);
                    
                    res.send('ERROR_UPDATE_DATABASE')
                }
                else{
                    res.send('OK')                    
                }
            });	
        }	
    });
}


module.exports = controller;