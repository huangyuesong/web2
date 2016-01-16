var crypto = require('crypto');

var utils = {};

utils.formatDBString =  function(data){
	return "'" + data + "'";
}

utils.toMD5 = function(content) {
	var md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
}

module.exports =  utils;
