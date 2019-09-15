//jshint esversion: 8


const express = require("express");
var app = express();
var http = require('http').createServer(app);
const bodyParser = require("body-parser");
var session = require('express-session');

const path = require("path");
const path2 = require("path");
const path3 = require("path");
var db = require("./database");
var login = require("./routes/login");
var logout = require("./routes/logout");
var cart = require("./routes/cart");

app.use(login);
app.use(logout);
app.use(cart);

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

//reference root page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'routes/index.html'));
});

app.get("/search", function(req, res) {

  const catID = req.query["catID"];
  runDB.getItems(catID, function(error, results) {
    if (error) {
      res.send(500, "Server Error");
      return;
    }
    // Respond with results as JSON
    res.send(results);
  });
});

app.get("/account",function(req,res){

 // db.query("SELECT * from orderTable where UsersID= '"+userID+"and Status=2'", (error, results, fields) => {
      if(req.session.userID==null||req.session.userID=="")
      res.redirect('/login')
      else
      res.sendFile(__dirname + "/routes/pastorder.html");
       //res.send(results);
      });

      app.get("/checkout",function(req,res){

        // db.query("SELECT * from orderTable where UsersID= '"+userID+"and Status=2'", (error, results, fields) => {
       
              res.sendFile(__dirname + "/routes/checkout.html");
              //res.send(results);
             });
       

      app.get("/orders",function(req,res){

        userID = session["UserID"];
       // const catID = req.query["catID"];
        runDBOrder.getItems(userID, function(error, results) {
        if (error) {
        res.send(500, "Server Error");
        return;
    }
    // Respond with results as JSON
    res.send(results);
  });
});

       /* for(var i =0; i < orders.length; i++){
       console.log(orders[i].orderID);
       console.log("ORDERS START HERE :");
    }
       db.query('SELECT productID from orderDetail where usersid = ' + userID ,function (error, results, fields) {
           if(error) {
             throw error;
            }
            console.log( results);
            //res.send(results);
          });

      res.sendFile(__dirname + "/routes/pastorder.html");
  });*/
  var runDBOrder = {
    getItems: function(userID, callback) {
      db.query("select c.orderID ORDERID,a.name PRODUCT , b.unitPrice UNITPRICE, b.quantity QUANTITY, DATE_FORMAT(c.orderDate, '%d %M %Y') AS ORDERDATE, replace(c.StatusID,'2','Shipped') STATUS , c.address ADDRESS, c.phone PHONE from ecommercedb.productDetails a, ecommercedb.orderDetail b , ecommercedb.orderTable c, ecommercedb.usersTable d where c.usersid=d.usersid and c.usersid=b.usersid and c.orderID = b.orderID and b.productID = a.productID and c.usersID ='"+userID+"' and c.StatusID='2'", (error, results, fields) => {
        if (error) {
          console.log(error);
          callback(true);
          return;
        }
        console.log(results);
        callback(false, results);
      });
    }
  };


var runDB = {
  getItems: function(catID, callback) {
    db.query("SELECT  name, unitPrice, picture from productDetails where categoryID='" + catID + "'", (error, results, fields) => {
      if (error) {
        console.log(error);
        callback(true);
        return;
      }
      console.log(results);
      callback(false, results);
    });
  }
};
//-----------------code to handle insert into cart table---------------------------------------

app.post("/addcart", function(req, res) {

  const name = req.query["name"];
  const qty = req.query["qty"];
  var prodID = null;

  // console.log(session["UserID"]);

  userID = session["UserID"];


  var sql_prodID = "select productId from productDetails where name = '" + name + "'";

  db.query(sql_prodID, function(err, result) {
    if (err) throw err;
    else {
      if (userID == null) {
        console.log("NEED TO LOGIN FIRST");
        return (null);
      } else {
        prodID = result[0].productId;
        console.log(prodID);
        var sql_update = "UPDATE Cart set qty = qty + '" + qty + "' where status ='1' and UserId = '" + userID + "' and ProductId IN (select  productId from productDetails where name = '" + name + "')";
        var sql_insert = "Insert into Cart (userID, ProductId, Qty, Status) values ('" + userID + "','" + prodID + "','" + qty + "', '1')";

        db.query(sql_update, function(err, result) {
          if (err) throw err;
          else {
            var rowsafctd = result.affectedRows;
            console.log(result.affectedRows + " record(s) updated");
            if (rowsafctd == 0) {
              db.query(sql_insert, function(err, result) {
                if (err) throw err;
                else {
                  console.log(result.affectedRows + " record(s) inserted");
                }
              });
            }
          }

        });
      }
    }
  });
  res.status(200);
  res.send();
});
//////////////////get cart elelements////////////////////////////////////////////
app.get("/cart_fetch", function(req, res) {

  userID = session["UserID"];

 // const name = req.query["name"];
 // var sql_prodID = "select productId from productDetails where name = '" + name + "'";
var sql="SELECT  b.name PRODUCT, a.qty QUANTITY, concat('$',b.unitPrice) as UNIT_PRICE, a.productid PROD_ID, a.userid USER_ID from Cart a, productDetails b where a.productId = b.productID and a.status =1 and a.userId = '" + userID + "'"
 db.query(sql , (error, results, fields) => {
          if (error) {
            console.log(userID)
            console.log(error);
           // callback(true);
            return;
          }
          console.log(results);
          res.send(results);
        });

});
//----------------------------------remove from Cart--------------------------
app.get("/remcart", function(req, res) {
  db.query("update Cart set Status=3 where UserId='"+req.query["userID"]+"' AND ProductID='"+req.query["prodID"]+"'",(error, results, fields) => {
    if(error){console.log("Error While removing from Cart "+session["UserID"]);
    console.log(error);
    return;}
    res.send(results);});
  });

  //---------------------------checkout-----------------------------------------------------------
  function joinBuffers(buffers, delimiter = ' ') {
    let d = Buffer.from(delimiter);

    return buffers.reduce((prev, b) => Buffer.concat([prev, d, b]));
  }

  app.post("/checkout", function(req, res) {
    userID = req.session.userID;
    let buf1 = Buffer.from(req.body.firstname);
let buf2 = Buffer.from(req.body.lastname);
let buf3 = Buffer.from(req.body.email);
let buf4 = Buffer.from(req.body.address);
let buf5 = Buffer.from(req.body.city);
let buf6 = Buffer.from(req.body.country);
let buf7 = Buffer.from(req.body.zipcode);
let joined = joinBuffers([buf1, buf2, buf3, buf4, buf5, buf6, buf7]);
    //var fname = req.body.firstname + " " +req.body.lastname + " " + req.body.email+ ', '+ req.body.address +' ,'+ req.body.city +' ,'+ req.body.country+' ,'+ req.body.zipcode;
    //let joined = joinBuffers([req.body.firstname, req.body.lastname, req.body.email,req.body.address,req.body.city , req.body.country, req.body.zipcode]);
    var fname = joined.toString();
    console.log(fname);
    var tel = req.body.tel;

    var sql_insert = "Insert into ecommercedb.orderTable (usersID, orderDate, statusID, address, phone) values ('" + userID + "',curdate(), 1, '"+fname+"','"+tel+"')";


      db.query(sql_insert, function(err, result) {
        if (err) return;
        else {
          console.log(result.affectedRows + " record(s) inserted");
          db.query("insert into ecommercedb.orderDetail(orderID, productID, unitPrice, quantity, usersid) select a.orderid, b.productid, c.unitPrice , b.qty, a.usersid from ecommercedb.orderTable a, ecommercedb.Cart b, ecommercedb.productDetails c where a.usersID='"+userID+"' and a.statusid ='1' and b.status ='1' and b.UserId ='"+userID+"' and c.productId = b.productId",function(err, result) {
            if (err) return;
        else {
          console.log(result.affectedRows + " record(s) inserted");
          db.query("update orderTable set Statusid=2 where UsersId= '" + userID + "' and Statusid=1" ,(error, results, fields) => {
            if(error)
            {console.log("Error While checkout from orderTable "+session["UserID"]);
            console.log(error);
            return;}
        });
        db.query("update Cart set Status=2 where UserId= '" + userID + "' and Status=1" ,(error, results, fields) => {
          if(error){console.log("Error While checkout from Cart "+session["UserID"]);
          console.log(error);
          return;}
          res.send();});
          res.redirect('index.html');
      }
      });
    }
  });
});



//Handle get requests
app.use(express.static(path2.join(__dirname, "routes")));
app.use(express.static(path3.join(__dirname, "payment")));

app.get("/dashboard", function(req, res) {
  if (req.session.loggedin) {
    res.sendFile(__dirname + "/routes/pastorder.html");
  } else {
    //res.send('Please login to view this page!');
    res.redirect("/login");
  }
});



http.listen(3000);
console.log("Server running on port 3000");
