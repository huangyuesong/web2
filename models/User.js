var conn = require('../config/mysql');

function User(user) {
	this.user_id = user.user_id;
	this.user_name = user.user_name;
	this.user_password = user.user_password;
	this.user_type = user.user_type;
};

User.getByUserName = function(user_name, callback) {
	var sql = [
		'select *',
		'from users',
		'where user_name = ?',
	].join(' ');

	var inserts = [user_name];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = User;
