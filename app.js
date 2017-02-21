/*
* Module dependencies
*/
var parseData = require("./parser");

/*
* runs on each request.
* no routes has been defined.
*/
function onRequest(request, response) {
  //array for storing payload from POST request
  var dataArr = [];

  //set headers for CORS
  response.setHeader("Content-Type","application/json");
  response.setHeader("Access-Control-Allow-Origin","*");

  //handle general error
  request.on('error',function(err){
    console.error(err);
  });

  /*
  * store payload as an array of objects
  * if json is invalid log error
  */
  request.on('data',function(data) {
    try {
      dataArr = JSON.parse(data.toString()).payload;
      // if accidentally data is set to undefined change it back to an empty array
      if(dataArr === undefined)
        dataArr = [];
    } catch(err) {
      console.error("invalid json request");
    }
  });

  /*
  * check if dataArr is not empty and call parseData
  * send 400 error if length is 0
  */
  request.on("end",function() {
    if(dataArr.length) {
      response.writeHead(200);
      response.end(JSON.stringify(parseData(dataArr)));
    }
    else {
      response.writeHead(400);
      response.end(JSON.stringify({"error": "Could not decode request: JSON parsing failed"}));
    }
  });
}

//export this module
module.exports = onRequest;
