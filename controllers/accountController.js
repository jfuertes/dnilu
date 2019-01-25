var dbconfig = require('../config/database');
var Database = require('../models/database');

var database = new Database(dbconfig.connection);

const accountController = {};

accountController.get = (req, res) => {
    console.log('get accounts');

    var query = 'SELECT * FROM ACCOUNT';

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

accountController.post = function(req, res) {
    console.log('post account');

    var query = 'INSERT ACCOUNT ( user_id,username,password,account_type) values (?, ?, ?, ?)';
    var params = [req.body.user_id, req.body.username, req.body.password, req.body.account_type]

    database.query(query, params)
    .then( results => {
        console.log(results.insertId);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json( { success: true, "dbResponse": results } );
	})
    .catch( err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.json( { error: err } );
	});
}

accountController.getById = (req, res) => {
    const { id } = req.params;
    console.log('get account with id %d', id);

    var query = 'SELECT * FROM ACCOUNT WHERE id = ?';
    var params = [id];
    
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
	})
}

accountController.putById = function(req, res) {
    const { id } = req.params;
    console.log('update user with id %d', id);

    var query = 'UPDATE ACCOUNT SET ? WHERE id = ?';

    var updatedAccount = {};

    if(req.body.name)
        updatedAccount.username = req.body.username;
    if(req.body.lastname)
        updatedAccount.password = req.body.password;
    if(req.body.phone)
        updatedAccount.account_type = req.body.account_type;

    var params = [updatedAccount, id];

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
	})
}

accountController.deleteById = (req, res) => {
    const { id } = req.params;
    console.log('delete account with id %d', id);

    var query = 'DELETE FROM ACCOUNT WHERE id = ?';
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
	})
}

accountController.getByUserId = (req,res) => {
    const { userId } = req.params;
    console.log('get account with user_id %d', userId);

    var query = 'SELECT * FROM ACCOUNT WHERE user_id = ?';
    var params = [userId];
    
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
	})
}

accountController.putByUserId = (req, res) => {
    const { userId } = req.params;
    console.log('update account with user_id %d', userId);
    
    var query = 'UPDATE ACCOUNT SET ? WHERE user_id = ?';
    var updatedAccount = {};

    if(req.body.name)
        updatedAccount.username = req.body.username;
    if(req.body.lastname)
        updatedAccount.password = req.body.password;
    if(req.body.phone)
        updatedAccount.account_type = req.body.account_type;

    var params = [updatedAccount, userId];

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
	})
}

module.exports = accountController;