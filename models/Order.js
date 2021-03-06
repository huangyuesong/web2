var conn = require('../config/mysql');

function Order(order) {
	this.order_id = order.order_id;
	this.client_id = order.client_id;
	this.product_id = order.product_id;
	this.buy_time = order.buy_time;
	this.order_status = order.order_status;// 0: 未完成, 1: 完成
	this.price = order.price;
	this.count = order.count;
	this.commented = order.commented;
};

Order.get = function(callback) {
	var sql = [
		'select *',
		'from clients_order_list',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Order.comment = function(order_id, callback) {
	var sql = [
		'update clients_order_list',
		'set commented = 1',
		'where order_id = ?',
	].join(' ');

	var inserts = [Number(order_id)];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
}

module.exports = Order;
