var path = require("path");
var uuid = require('uuid');
var should = require("should");
var ServiceInstance = require(path.join(__dirname,'../bean/serviceInstance.js'));
describe('Unit test for bean/ServiceInstance', function(){

	it('new a ServiceInstance object o, o.instanceOf ServiceInstance should be true', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var is = serviceInstanceObj instanceof ServiceInstance;
		is.should.equal(true);
		done();
	});	
	it('new a ServiceInstance object o, the constructor of o should equal ServiceInstance', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var is = serviceInstanceObj.constructor;
		is.should.equal(ServiceInstance);
		done();
	});	
	it('test isNull true', function(done){
		var serviceId = null;
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var isnull = serviceInstanceObj.isNull("serviceId");
		isnull.should.equal(true);
		done();
	});	
	it('test isNull false', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var isnull = serviceInstanceObj.isNull("serviceId");
		isnull.should.equal(false);
		done();
	});
	it('test isUndefined true', function(done){
		var serviceId;
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var isnull = serviceInstanceObj.isUndefined("serviceId");
		isnull.should.equal(true);
		done();
	});	
	it('test isUndefined false', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var isnull = serviceInstanceObj.isUndefined("serviceId");
		isnull.should.equal(false);
		done();
	});	
	it('new a ServiceInstance object o, leaving serviceId is undefined, the result of validate should be false', function(done){
		var serviceId;
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var response = serviceInstanceObj.validate();
		response.success.should.equal(false);
		done();
	});	
	it('new a ServiceInstance object o, and all fields have values, so the result of validate should be true', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var response = serviceInstanceObj.validate();
		response.success.should.equal(true);
		done();
	});	
	it('test getFieldList', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var list = serviceInstanceObj.getFieldList();
		var json = JSON.stringify(list);
		json.should.equal('{"service_id":"' + serviceId + '","org_id":"' + orgId + '","space_id":"' + spaceId + '"}');
		done();
	});	
	it('Test toString', function(done){
		var serviceId = uuid.v4();
		var orgId = uuid.v4();
		var spaceId = uuid.v4();
		var serviceInstanceObj = new ServiceInstance(serviceId, orgId, spaceId);
		var str = serviceInstanceObj.toString();
		str.should.equal('ServiceInstance [serviceId = ' + serviceId + ',orgId = ' + orgId + ',spaceId = ' + spaceId + ', ]');
		done();
});
});