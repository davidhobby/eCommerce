
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'csc667-group8.caamxby8fquc.us-west-1.rds.amazonaws.com',
  user: 'dbuser',
  password: 'csc667_group8',
  database: 'ecommercedb',
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
