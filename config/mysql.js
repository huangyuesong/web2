var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'iforgot',
  database:'web',
  port: 3306
});

module.exports = conn;
