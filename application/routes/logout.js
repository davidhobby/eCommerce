//jshint esversion:8

const express = require("express");
var app = express();

app.get("/logout", function(req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});


module.exports = app;
