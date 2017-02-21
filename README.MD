##Node Coding Challenge
A small json based web service

####URL
    http://coding-challenge-chaneetsk.herokuapp.com/

##Usage
use POST request to send json data

####Install Dependencies
    $ npm install

####POST request
    var request = { //payload };
    fetch(url,{
        //set headers
        body: request
    })
    .then(function(response) { //use response as required })
    .catch(function(err) { // handle error });

####GET request error
GET request generates a response of 400 Bad Request

    {"error": "Could not decode request: JSON parsing failed"}

####Test

    $ npm test
