var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const machineryController = {};

machineryController.get = (req, res) => {
    console.log('get machineries');

    var query = 'SELECT * FROM MACHINERY';

    database.query(query)
    .then( results => {
        console.log(results);
        res.json(results);
	})
    .catch( err => {
        console.log(err);
        res.json( { error: err } );
	})
}

machineryController.post = (req, res) => {
    console.log('post machinery');

    var query = 'INSERT DNI ( dni_code ) values ( ? )'
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

machineryController.getById = (req, res) => {
    const { id } = req.params;
    console.log('get dni with id %d', id);

    var query = 'SELECT * FROM DNI WHERE dni_code = ?';
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

machineryController.putById=function(req, res) {
    const { id } = req.params;
    console.log('update machinery with id %d', id);

    var query= 'UPDATE MACHINERY SET ? WHERE id = ?'
    var params = [updatedMachinery, id]
}

machineryController.deleteById = (req, res) => {
    const { id } = req.params;
    console.log('delete machinery with id %d', id);

    var query = 'DELETE FROM MACHINERY WHERE id = ?';
    var params = [id];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.json( { success: true, dbResponse: results } );
	})
    .catch(err => {
        console.log(err);
        res.json({error: err});
	});
}
machineryController.getHistoryById = (req, res) => {
    const { id } = req.params;
    console.log('get History with user id %d', id );

    var query = 'SELECT * FROM SENSOR_HISTORY WHERE machinery_id = ?';
    var params = [id];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( results );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}
machineryController.getActualByIdIdsensor = (req, res) => {
    
    const { id } = req.params;
    const { idsensor } = req.params;

    console.log('get History with user id %d', id );

    var query = 'SELECT value FROM SENSOR_HISTORY WHERE machinery_id = ? and sensor_type = ? ORDER BY date desc limit 1';
    var params = [id, idsensor];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( results );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}

machineryController.getHistoryByIdIdsensor = (req, res) => {
    
    const { id } = req.params;
    const { idsensor } = req.params;

    console.log('get History with user id %d', id );

    var query = 'SELECT value, date FROM SENSOR_HISTORY WHERE machinery_id = ? and sensor_type = ? ORDER BY date desc';
    var params = [id, idsensor];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( results );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}




module.exports = machineryController;