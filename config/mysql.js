var mysql = require('mysql');
// var conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'iforgot',
//   database:'web',
//   port: 3306
// });
var conn = mysql.createConnection({
  host: 'huangyuesong.mysql.rds.aliyuncs.com',
  user: 'huangyuesong',
  password: 'iforgot',
  database:'web2',
  port: 3306
});

module.exports = conn;
