/**
 * Created by sc452095 on 11/24/16.
 */
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var routerfile =require('./services.js');
var request = require("request");
var http = require('http');

// configuration =================
//var database;
//var MongoClient = require('mongodb').MongoClient
 //   , format = require('util').format;
//MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
 //   if (err) {
 //       throw err;
 //   } else {
 //       database = db;
//        console.log("successfully connected to the database");

 //   }
    //db.close();
//});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.listen(3000);
console.log("App listening on port 8080");
var emp = [];
 


app.get('/Exerciseproject/Testpackage',routerfile.getEvents); 
app.post('/Exerciseproject/Testpackage',routerfile.updateEvents);
app.post('/Exerciseproject/CreatePackage',routerfile.createEvents);
app.post('/Exerciseproject/DeletePackage',routerfile.deleteEvents);
/* app.post("/profileupdate", function(req, res) {
    console.log("here in calling functoion");
   var data = req.body;
    console.log(data);
    database.collection('profiledata').insert(data, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            database.collection('profiledata').find({}).toArray(function(err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get contacts.");
                } else {
                    console.log(docs)
                    res.status(200).json(docs);
                }
            });
        }
    });
}); */
// listen (start app with node server.js) ======================================
