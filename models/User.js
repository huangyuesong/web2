var conn = require('../config/mysql');

function User(user) {
	this.user_id = user.user_id;
	this.user_name = user.user_name;
	this.user_password = user.user_password;
	this.user_type = user.user_type;
};

User.get = function(callback) {
	var sql = [
		'select *',
		'from users',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

User.getByUserId = function(user_id, callback) {
	var sql = [
		'select *',
		'from users',
		'where user_id = ?',
	].join(' ');

	var inserts = [user_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

User.getByUserType = function(user_type, callback) {
	var sql = [
		'select *',
		'from users',
		'where user_type = ?',
	].join(' ');

	var inserts = [user_type];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

User.delete = function(user_id, callback) {
	var sql = [
		'delete',
		'from users',
		'where user_id = ?',
	].join(' ');

	var inserts = [user_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

User.add = function(user, callback) {
	var sql = 'insert into users set ?';

	var inserts = {
		user_id: user.user_id,
		user_name: user.user_name,
		user_type: user.user_type,
		user_password: user.user_password,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

User.update = function(user, callback) {
	var sql = [
		'update users',
		'set user_password = ?',
		'where user_id = ?',
	].join(' ');

	var inserts = [
		user.user_password,
		user.user_id,
	];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = User;
