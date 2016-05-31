var fs = require('fs');
var path = require('path');
var should = require('should');
var api = new require( path.join (__dirname, '/../../../api/api.js'))();
var settings = JSON.parse(fs.readFileSync( path.join (__dirname, '/../../../config/settings.json'), 'utf8'));


describe('Unit Test for API', function() {
it('getCatalog() should return catalog info with JSON format', function() {
	api.getCatalog(function(data){
      data.services[0].id.should.equal(settings.service_id);
      data.services[0].name.should.equal(settings.service_name);
      data.services[0].description.should.equal(settings.service_description);
      data.services[0].plans[0].id.should.equal(settings.plan_id);
      data.services[0].plans[0].name.should.equal(settings.plan_name);
      data.services[0].plans[0].description.should.equal(settings.plan_description);
    });

});

});