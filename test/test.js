/*
* Require the dependencies
*/
var parseData = require('../parser');
var server = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var sampleReq = require('./sample_request.json');
var sampleRes = require('./sample_response.json');

chai.use(chaiHttp);

describe('JSON Parser',function() {
  it('it should return parsed json data',function() {
    expect(parseData(sampleReq.payload)).to.be.an('object');
    expect(parseData(sampleReq.payload)).to.have.property('response');
    expect(parseData(sampleReq.payload).response[0]).to.have.property('image');
    expect(Object.keys(parseData(sampleReq.payload).response[0]).length).to.be.equal(3);
  });
});

describe('GET request test',function(){
  it('it should return json stating an error',function(done){
    chai.request(server)
      .get('/')
      .end(function(err,res) {
        expect(res).to.have.status(400);
        expect(res).to.have.property('error');
        done();
      });
  });
});

describe('POST request test',function(){
  it('it should send a parsed json',function(done){
    chai.request(server)
      .post("/")
      .send(sampleReq)
      .end(function(err,res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('response');
        done();
      });
  });
});
