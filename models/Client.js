var conn = require('../config/mysql');

function Client(client) {
	this.client_id = client.client_id;
	this.client_name = client.client_name;
	this.client_address = client.client_address;
	this.client_phone = client.client_phone;
	this.client_level = client.client_level;
	this.client_create_time = client.client_create_time;
};

Client.get = function(callback) {
	var sql = [
		'select *',
		'from clients',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Client.delete = function(client_id, callback) {
	var sql = [
		'delete',
		'from clients',
		'where client_id = ?',
	].join(' ');

	var inserts = [client_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Client.add = function(client, callback) {
	var sql = 'insert into clients set ?';

	var inserts = {
		client_id: client.client_id,
		client_name: client.client_name,
		client_level: 0,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Client;
