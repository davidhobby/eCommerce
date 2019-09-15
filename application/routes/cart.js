//jshint esversion:8

const express = require("express");
var session = require('express-session');
//const mysql = require("mysql");
var db = require("../database");
const bodyParser = require("body-parser");
var app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/cart", function(req,res){

  const userID = req.session.userID;
  runDB.getCart(userID, function (error, results) {
    if(error) { res.send(500, "Server Error");
    return; }
    // Respond with results as JSON
    res.send(results);
});  });

var runDB = {
  getCart: function (userID, callback) {
      console.log("SELECT * from Cart where UserID='"+userID+"' and Status=1'");
      db.query("SELECT * from Cart where UserID='"+userID+"and Status=1'", (error, results, fields) => {
          if(error) { console.log(error); callback(true); return; }
          console.log(results);
          callback(false, results);
      });
  }
};

module.exports = app;
