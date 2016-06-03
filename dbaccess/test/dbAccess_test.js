var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

// This agent refers to PORT where program is runninng.
var settings = JSON.parse(fs.readFileSync( path.join (__dirname, '../../config/settings.json'), 'utf8'));
var dbUser = settings.postgresql_username;
var dbPwd = settings.postgresql_password;
var dbHost = settings.postgresql_host;
var dbPort = settings.postgresql_port;
var dbName = settings.postgresql_dbName;
var connectionStr = "postgres://" + dbUser + ":" + dbPwd + "@" + dbHost + ":" + dbPort + "/" + dbName;
var BindDao = 			 new require(path.join(__dirname,'../dao/bindDao.js'));
var ServiceInstanceDao = new require(path.join(__dirname,'../dao/serviceInstanceDao.js'));
var Binding = require(path.join(__dirname,'../bean/binding.js'));
var ServiceInstance = require(path.join(__dirname,'../bean/serviceInstance.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
var binding = new Binding();
var serviceInstance = new ServiceInstance();
var bindDao = new BindDao(connectionStr);
var serviceInstanceDao = new ServiceInstanceDao(connectionStr);

describe('Unit Test for bindDAO', function() {
	beforeEach(function(done){
   		bindDao.remove(binding,function(data){
   			done();
   		});
  	})
	it('get should return a empty list with a empty binding table', function(done) {
		bindDao.get(binding, function(data){
			data.data.rowCount.should.equal(0);
			done();
		});
		
	});
	
	it('insert a new BindingData, and return 1 element with get', function(done) {
			var appId = uuid.v4();
			var serviceId = uuid.v4();
			var bindingId = uuid.v4();
			var timestamp = new Date().getTime();
			bindDao.add(new Binding(appId, serviceId, bindingId, timestamp),function(){
				bindDao.get(binding, function(data){
				data.data.rowCount.should.equal(1);
				data.data.rows[0].appId.should.equal(appId);
				data.data.rows[0].serviceId.should.equal(serviceId);
				data.data.rows[0].bindingId.should.equal(bindingId);
				parseInt(data.data.rows[0].timestamp).should.equal(timestamp);
				done();
			});
		});
		
	});
	it('insert a new BindingData, and return empty after remove', function(done) {
			var appId = uuid.v4();
			var serviceId = uuid.v4();
			var bindingId = uuid.v4();
			var timestamp = new Date().getTime();

			bindDao.add(new Binding(appId, serviceId, bindingId, timestamp), function(){
				bindDao.remove(binding, function(data){
					bindDao.get(binding,function(data){
						data.data.rowCount.should.equal(0);
						done();
					});
				
			});
		});
		
	});
}); 

describe('Unit Test for serviceInstanceDAO', function() {
	beforeEach(function(done){
   		serviceInstanceDao.remove(serviceInstance,function(data){
   			done();
   		});
  	})
	it('get should return a empty list with a empty binding table', function(done) {
		serviceInstanceDao.get(serviceInstance, function(data){
			data.data.rowCount.should.equal(0);
			done();
		});
		
	});
	it('insert a new BindingData, and return 1 element with get', function(done) {
			var serviceId = uuid.v4();
			var orgId = uuid.v4();
			var spaceId = uuid.v4();
			serviceInstanceDao.add(new ServiceInstance(serviceId, orgId, spaceId),function(){
				serviceInstanceDao.get(serviceInstance, function(data){
				data.data.rowCount.should.equal(1);
				data.data.rows[0].serviceId.should.equal(serviceId);
				data.data.rows[0].orgId.should.equal(orgId);
				data.data.rows[0].spaceId.should.equal(spaceId);
				done();
			});
		});
		
	});
	it('insert a new BindingData, and return empty after remove', function(done) {
			var serviceId = uuid.v4();
			var orgId = uuid.v4();
			var spaceId = uuid.v4();

			serviceInstanceDao.add(new ServiceInstance(serviceId, orgId, spaceId), function(){
				serviceInstanceDao.remove(serviceInstance, function(data){
					serviceInstanceDao.get(serviceInstance,function(data){
						data.data.rowCount.should.equal(0);
						done();
					});
				
			});
		});
		
	});
}); 
