var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const procealarmasController = {};

procealarmasController.get = (req,res) => {
    console.log('get alarmas');

    var query = 'SELECT * FROM alarmas';

    database.query(query)
    .then( results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(results);
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}

procealarmasController.post = (req, res) => {
    var enviarData=false;
    console.log('post alarma');
//comienza procesamiento.....
//modelo de entrada{    "id": "101",    "energia": "1",    "voltaje": "11.5",    "estado": "2",}

//selecionar primera entrada de ese ID,
var query = 'SELECT * FROM  keepalive  where id=?';
var params = [ req.body.id];
database.query(query, params)
.then( results => {
    console.log(results);
    console.log(results.length);
    //si tiene 4 eliminar anterior
    if(results.length >5){
        console.log("hay 5");
        var query2 = 'DELETE  FROM  keepalive  where id=? ORDER BY fecha ASC LIMIT 1 ';
        var params2 = [ req.body.id];
        database.query(query2, params2)
        .then( results2 => {
            console.log(results2);
            
           
        })
        .catch( err => {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.json( { error: err } );
        });
    }
    else{
        console.log("no tiene la cantidad");
    }
    var query = 'INSERT keepalive (  id, energia, voltaje, estado ) values ( ?, ?, ?, ? )';
    var params = [ req.body.id, req.body.energia, req.body.voltaje, req.body.estado];
    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( { success: true, "dbResponse": results } );
	})
    .catch(err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
    });
})
.catch( err => {
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.json( { error: err } );
});

//guardar en base de datos, y comparar con anterior datos



//termina procesamiento.....
if(enviarData){ //si 
    var query = 'INSERT alarmas (  direccion, latitud, longitud, numero, nombre, energia, bateria, status, users_username ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )';
    var params = [ req.body.direccion, req.body.latitud, req.body.longitud, req.body.numero, req.body.nombre, req.body.energia, req.body.bateria, req.body.status, req.body.users_username];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( { success: true, "dbResponse": results } );
	})
    .catch(err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
    });
}

    
}

procealarmasController.putById = (req, res) => {
    const { id } = req.params;

    console.log('update user with id %d', id );

    var query = 'UPDATE USERS SET ? WHERE id = ?';
    var updatedUser = {};
    if(req.body.name)
        updatedUser.name = req.body.name;
    if(req.body.lastname)
        updatedUser.lastname = req.body.lastname;
    if(req.body.phone)
        updatedUser.phone = req.body.phone;
    if(req.body.email)
        updatedUser.email = req.body.email;

    var params = [updatedUser, id];
    
    database.query(query, params)
    .then( results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( { success: true, dbResponse: results } );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}


module.exports = procealarmasController;