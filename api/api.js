module.exports = function(){

var fs = require('fs');
var path = require('path');

var settings = JSON.parse(fs.readFileSync( path.join(__dirname, '../config/settings.json'), 'utf8'));
var catalog = JSON.parse(fs.readFileSync( path.join(__dirname, '../config/catalog.json'), 'utf8'));

var ServiceInstanceDao = new require(path.join(__dirname,'../dbaccess/dao/serviceInstanceDao.js'));
var ServiceInstance = require(path.join(__dirname,'../dbaccess/bean/serviceInstance.js'));
var BindDao = new require(path.join(__dirname,'../dbaccess/dao/bindDao.js'));
var Binding = require(path.join(__dirname,'../dbaccess/bean/binding.js'));
var Response = require(path.join(__dirname,'../dbaccess/bean/response.js'));

var dbUser = settings.postgresql_username;
var dbPwd = settings.postgresql_password;
var dbHost = settings.postgresql_host;
var dbPort = settings.postgresql_port;
var dbName = settings.postgresql_dbName;
var connectionStr = "postgres://" + dbUser + ":" + dbPwd + "@" + dbHost + ":" + dbPort + "/" + dbName;
var serviceInstanceDao = new ServiceInstanceDao(connectionStr);
var bindingDao = new BindDao(connectionStr);
var module = {};
module.getCatalog = function(callback) {
  catalog.services[0].id=settings.service_id;
  catalog.services[0].name=settings.service_name;
  catalog.services[0].description=settings.service_description;
  catalog.services[0].plans[0].id=settings.plan_id;
  catalog.services[0].plans[0].name=settings.plan_name;
  catalog.services[0].plans[0].description=settings.plan_description;

  callback(catalog);
};
module.provision = function(serviceId, orgId, spaceId, callback){
	serviceInstanceDao.add(new ServiceInstance(serviceId, orgId, spaceId), function(response){
		callback(response);
	});
};
module.deprovision = function(serviceId, callback){
  serviceInstanceDao.remove(new ServiceInstance(serviceId, null, null), function(response){
    callback(response);
  });
};
module.bind = function(serviceId, bindingId, appId, callback){
  bindingDao.add(new Binding(appId, serviceId, bindingId, new Date().getTime()), function(response){
    callback(response);
  });
};
module.unbind = function(serviceId, bindingId, callback){
  bindingDao.remove(new Binding(null, serviceId, bindingId, null), function(response){
    callback(response);
  });
};




return module;
};