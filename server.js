var express = require('express');
var request = require('request');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var query = require('./server/dbqueries.js');

var app = express();
app.use(bodyParser.json());
var PORT = process.env.PORT || 9001;

app.use(express.static(__dirname + '/client'));


app.get('/newGame', function(req, res){
  query.randomQuery(function(results) {
    res.send(results);
  });
});

app.listen(PORT, function(){
  console.log('listening on PORT ' + PORT);
})
