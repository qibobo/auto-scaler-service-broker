var path = require("path");
var BaseDao = require("./baseDao.js");
var ServiceInstance = require(path.join(__dirname,'../bean/serviceInstance.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
var ServiceInstanceDao = function(connectionString){
	this.connectionString = connectionString;
	this.dao = new BaseDao(this.connectionString,{
		insert : "INSERT INTO service_instance ",
		select : "SELECT * FROM service_instance WHERE 1 = 1 ",
		remove : "DELETE FROM service_instance WHERE 1 = 1 "
	});
};
ServiceInstanceDao.prototype.get = function(entity, callback){
	this.dao.get(entity, ServiceInstance, callback);
};
ServiceInstanceDao.prototype.add = function(entity, callback){
	this.dao.add(entity, ServiceInstance, callback);
}
ServiceInstanceDao.prototype.remove = function(entity, callback){
	this.dao.remove(entity, ServiceInstance, callback);
}
module.exports = ServiceInstanceDao;