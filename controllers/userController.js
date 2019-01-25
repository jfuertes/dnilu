var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const userController = {};

userController.get = (req,res) => {
    console.log('get users');

    var query = 'SELECT * FROM USERS';

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

userController.post = (req, res) => {
    console.log('post user');

    var query = 'INSERT USERS ( name, lastname, phone, email ) values ( ?, ?, ?, ? )';
    var params = [req.body.name, req.body.lastname, req.body.phone, req.body.email];

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

userController.getById = (req, res) => {
    const { id } = req.params;
    console.log( 'get user with id %d', id );

    var query = 'SELECT * FROM USERS WHERE id = ?';
    var params = [id]

    database.query(query, params)
    .then( results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( results[0] );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}

userController.putById = (req, res) => {
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

userController.deleteById = (req, res) => {
    const { id } = req.params;
    console.log('delete user with id %d', id );

    var query = 'DELETE FROM USERS WHERE id = ?';
    var params = [id];

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

userController.getAccountById = (req, res) => {
    const { id } = req.params;
    console.log('get account with user id %d', id );

    var query = 'SELECT * FROM ACCOUNT WHERE user_id = ?';
    var params = [id];

    database.query(query, params)
    .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( results[0] );
	})
    .catch(err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode= 500;
        res.json( { error: err } );
	});
}

userController.getMachineriesById = (req, res) => {
    const { id } = req.params;
    console.log('get machineries with user id %d', id );

    var query = 'SELECT * FROM MACHINERY WHERE user_id = ?';
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

userController.postWithAccount = (req, res) => {
    console.log('post user with account');
}

module.exports = userController;