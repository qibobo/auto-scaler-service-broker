var path = require("path");
var utils = require(path.join(__dirname,'../bean/utils.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
var BaseEntity = require(path.join(__dirname,'../bean/baseEntity.js'));
var Binding = function Binding(appId, serviceId, bindingId, timestamp){

	this.appId = appId;
	this.serviceId = serviceId;
	this.bindingId = bindingId;
	this.timestamp = timestamp;
};
/* Primary key */
Binding.prototype.key = "bindingId";
Binding.prototype.mapper = {
	appId : { column : "app_id", notNull: true },
	serviceId : { column : "service_id", notNull: true },
	bindingId : { column : "binding_id", notNull : true },
	timestamp : { column : "timestamp", notNull : true }
};
utils.extend(Binding, BaseEntity);
// Binding.prototype.toString = function(){
// 	return "Binding [ appId = " + this.appId + ", serviceId = " + this.serviceId + ", bindingId = " + this.bindingId + ", timestamp = " + this.timestamp + " ]";
// };
// Binding.prototype.isUndefined = function(key){
// 	return typeof(this[key]) == "undefined";
// }
// Binding.prototype.isNull = function(key){
// 	return !this[key] && typeof(this[key]) != "undefined" && this[key] !=0;
// }
// Binding.prototype.validate = function(){
// 	for( var key in this ){
// 		if(this.hasOwnProperty(key) && this.mapper[key]["notNull"] == true){

// 			if(this.isUndefined(key)){
// 				return new Response(false, "The value of " + key + " can not be undefined", null);
// 			}
// 			if(this.isNull(key)){
// 				return new Response(false, "The value of " + key + " can not be null", null);
// 			}
// 		}		
// 	}
// 	return new Response(true, null, null);
	
// }
// Binding.prototype.getFieldList = function(){
// 	var map = {};
// 	for (var key in this){
// 		if(this.hasOwnProperty(key) && !this.isUndefined(key) && !this.isNull(key)){
// 			var columnName = this.mapper[key]["column"];
// 			map[columnName] = this[key];
// 		}
// 	}
// 	return map;
// };
module.exports = Binding;