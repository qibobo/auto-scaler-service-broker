var path = require("path");
var BaseDao = require("./baseDao.js");
var Binding = require(path.join(__dirname,'../bean/binding.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
var BindDao = function(connectionString){
	this.connectionString = connectionString;
	this.dao = new BaseDao(this.connectionString,{
		insert : "INSERT INTO binding ",
		select : "SELECT * FROM binding WHERE 1 = 1 ",
		remove : "DELETE FROM binding WHERE 1 = 1 "
	});
};
BindDao.prototype.get = function(entity, callback){
	this.dao.get(entity, Binding, callback);
};
BindDao.prototype.add = function(entity, callback){
	this.dao.add(entity, Binding, callback);
}
BindDao.prototype.remove = function(entity, callback){
	this.dao.remove(entity, Binding, callback);
}
module.exports = BindDao;