'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
console.log("writing code within VS Code");
//mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//var createAndSaveUrl = require('./myApp.js').createAndSaveUrl;
// the process.env.TEST_VAR DOES properly log. Not sure wtf is going on.
var localRefToFun = require('./myApp.js').createAndSaveUrl;
app.get("/api/customTest", function(req, res){
  let testCrossFile = "test";
  testCrossFile = localRefToFun();
  res.json({message: testCrossFile});
})

// router.post("/api/shorturl/new", function(req, res){
  
// })


app.listen(port, function () {
  console.log('Node.js listening ...');
});