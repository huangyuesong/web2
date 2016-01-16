var conn = require('../config/mysql');

function User(user) {
	this.id = user.id;
	this.name = user.name;
	this.password = user.password;
	this.type = user.type;
};

module.exports = User;

User.prototype.get = function(name) {
	
};
