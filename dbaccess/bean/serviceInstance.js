var path = require("path");
var utils = require(path.join(__dirname,'../bean/utils.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
var BaseEntity = require(path.join(__dirname,'../bean/baseEntity.js'));
var ServiceInstance = function ServiceInstance(serviceId, orgId, spaceId){
	this.serviceId = serviceId;
	this.orgId = orgId;
	this.spaceId = spaceId;
};
/* Primary key */
ServiceInstance.prototype.key = "serviceId";
ServiceInstance.prototype.mapper = {
	serviceId : { column : "service_id", notNull: true },
	orgId : { column : "org_id", notNull: true },
	spaceId : { column : "space_id", notNull : true }
};
utils.extend(ServiceInstance, BaseEntity);
// ServiceInstance.prototype.toString = function(){
// 	return "ServiceInstance [ serviceId = " + this.serviceId + ", orgId = " + this.orgId + ", spaceId = " + this.spaceId + "]";
// }
// ServiceInstance.prototype.isUndefined = function(key){
// 	return typeof(this[key]) == "undefined";
// }
// ServiceInstance.prototype.isNull = function(key){
// 	return !this[key] && typeof(this[key]) != "undefined" && this[key] !=0;
// }
// ServiceInstance.prototype.validate = function(){
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
// ServiceInstance.prototype.getFieldList = function(){
// 	var map = {};
// 	for (var key in this){
// 		if(this.hasOwnProperty(key) && !this.isUndefined(key) && !this.isNull(key)){
// 			var columnName = this.mapper[key]["column"];
// 			map[columnName] = this[key];
// 		}
// 	}
// 	return map;
// };
module.exports = ServiceInstance;