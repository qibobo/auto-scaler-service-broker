var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var path = require('path');

// This agent refers to PORT where program is runninng.
var settings = JSON.parse(fs.readFileSync( path.join (__dirname, '../../config/settings.json'), 'utf8'));
var port = process.env.PORT || settings.port;
var server = supertest.agent("http://localhost:"+port);

// UNIT test begin

describe("RESTful API test suite",function(){

  it("should return catalog json",function(done){

    server
    .get("/v2/catalog")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.services[0].id.should.equal(settings.service_id);
      res.body.services[0].name.should.equal(settings.service_name);
      res.body.services[0].description.should.equal(settings.service_description);
      res.body.services[0].plans[0].id.should.equal(settings.plan_id);
      res.body.services[0].plans[0].name.should.equal(settings.plan_name);
      res.body.services[0].plans[0].description.should.equal(settings.plan_description);
      done();
    });
  });

});