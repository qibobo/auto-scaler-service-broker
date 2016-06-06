var path = require("path");
var uuid = require('uuid');
var should = require("should");
var Binding = require(path.join(__dirname,'../bean/binding.js'));
describe('Unit test for bean/Binding', function(){

	it('new a Binding object o, o.instanceOf Binding should be true', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var is = bindingObj instanceof Binding;
		is.should.equal(true);
		done();
	});	
	it('new a Binding object o, the constructor of o should equal Binding', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var is = bindingObj.constructor;
		is.should.equal(Binding);
		done();
	});	
	it('test isNull true', function(done){
		var appId = null;
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var isnull = bindingObj.isNull("appId");
		isnull.should.equal(true);
		done();
	});	
	it('test isNull false', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var isnull = bindingObj.isNull("appId");
		isnull.should.equal(false);
		done();
	});	
	it('test isUndefined true', function(done){
		var appId;
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var isnull = bindingObj.isUndefined("appId");
		isnull.should.equal(true);
		done();
	});	
	it('test isUndefined false', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var isnull = bindingObj.isUndefined("appId");
		isnull.should.equal(false);
		done();
	});	
	it('new a Binding object o, leaving appId is undefined, the result of validate should be false', function(done){
		var appId;
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var response = bindingObj.validate();
		response.success.should.equal(false);
		done();
	});	
	it('new a Binding object o, and all fields have values, so the result of validate should be true', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var response = bindingObj.validate();
		response.success.should.equal(true);
		done();
	});	
	it('test getFieldList', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var list = bindingObj.getFieldList();
		var json = JSON.stringify(list);
		json.should.equal('{"app_id":"' + appId + '","service_id":"' + serviceId + '","binding_id":"' + bindingId + '","timestamp":' + timestamp + '}');
		done();
	});	
	it('Test toString', function(done){
		var appId = uuid.v4();
		var serviceId = uuid.v4();
		var bindingId = uuid.v4();
		var timestamp = new Date().getTime();
		var bindingObj = new Binding(appId, serviceId, bindingId, timestamp);
		var str = bindingObj.toString();
		str.should.equal(bindingObj.constructor.name + ' [appId = ' + appId + ',serviceId = ' + serviceId +',bindingId = ' + bindingId + ',timestamp = ' + timestamp + ', ]');
		done();
});
});