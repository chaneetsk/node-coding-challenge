'use strict';
/*
* Module dependencies
*/
var http = require('http');
var app = require('./app');

/*
* Get port from environment
*/
var port = process.env.PORT || 8000;

/*
* Create http server and listen on provided port
*/
var server = http.createServer(app).listen(port);

/*
* export server for testing
*/
module.exports = server;
