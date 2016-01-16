var conn = require('../config/mysql');

function Order(order) {
	this.client_id = order.client_id;
	this.product_id = order.product_id;
	this.buy_time = order.buy_time;
	this.order_status = order.order_status;// 0: 未完成, 1: 完成
	this.price = order.price;
};

Order.get = function(client_id, callback) {
	var sql = [
		'select *',
		'from clients_order_list',
		'where client_id = ?',
	].join(' ');

	var inserts = [client_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Order;
