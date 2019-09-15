
//jshint esversion:8

const express = require("express");
var session = require('express-session');
//const mysql = require("mysql");
var db = require("../database");
const bodyParser = require("body-parser");
var app = express();
const bcrypt = require('bcryptjs');
const saltRounds = 14;

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly:false,
    secure: false}

}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/login", function (req, res) {
  if (req.session === undefined || !req.session.loggedin) {
    res.sendFile(__dirname + "/login.html");
  } else {
    res.redirect("/");
  }
});





  app.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {

      db.query('SELECT * FROM usersTable WHERE username = ?', [username], function (error, results, fields) {

        if (results[0] != null) {

          bcrypt.compare(password, results[0].password, function (err, res) {
            if (res) {
              request.session.loggedin = true;
              request.session.username = username;
              request.session.userID = results[0].usersid;
              session["UserID"]=results[0].usersid;
              response.redirect("/");
            } else {
              response.send('Incorrect Username!');
            }
            response.end();
          });
        } else {
          response.send('User not found!');
        }
      });

    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });



app.get("/register", function (req, res) {
  if (req.session === undefined || !req.session.loggedin) {
    res.sendFile(__dirname + "/register.html");
  } else {
    res.redirect("/");
  }
});

app.post("/register", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  db.query('SELECT * FROM ecommercedb.usersTable WHERE username = ?;', [username], function (error, results, fields) {
    if (results[0] == undefined) {
      if (password == password2) {
        bcrypt.hash(password, saltRounds, function (err, hash) {

          var sql = "INSERT INTO usersTable (fname,lname,password,username) VALUES ('" + fname + "','" + lname + "','" + hash + "','" + username + "')";

          db.query(sql, function (err, result) {
            if (err) throw err;
            else {
              res.redirect("/login");
            }
          });
        });
      } else {
        res.send("Passwords don't match. Please try again!");
        res.end();
      }
    } else {
      res.send("Username is already used. Please try another.");
      res.end();
    }
  });
});

module.exports = app;
