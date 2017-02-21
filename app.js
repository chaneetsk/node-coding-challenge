/*
* Module dependencies
*/
var parseData = require("./parser");

/*
* runs on each request.
* no routes has been defined.
*/
function onRequest(request, response) {
  //for storing payload from POST request
  var data = '', dataArr=[];

  //set headers for CORS
  response.setHeader("Content-Type","application/json");
  response.setHeader("Access-Control-Allow-Origin","*");

  //handle general error
  request.on('error',function(err){
    console.error(err);
  });

  // store data
  request.on('data',function(chunk) {
    data += chunk;
  });

  /*
  * on request end, send data to parser and handle errors
  */
  request.on("end",function() {

    /*
    * check json validity, if invalid log error
    * store buffer as an array
    */
    try {
      dataArr = JSON.parse(data.toString()).payload;
    } catch(err) {
      console.error("invalid json file");
    }

    /*
    * if dataArr is undefined due to sending invalid json file change is back
    * an empty array.
    */
    if(dataArr === undefined)
      dataArr = [];

    // if length is more than 0, call parseData function else send status 400
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
