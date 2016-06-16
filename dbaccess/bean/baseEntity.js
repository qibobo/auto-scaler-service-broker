var path = require("path");
var Response = require(path.join(__dirname, '../bean/response.js'));
var BaseEntity = function() {};
BaseEntity.prototype.toString = function() {
  var str = this.constructor.name + " [";
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      str += key + " = " + this[key] + ","
    }
  }
  return str + " ]";
}
BaseEntity.prototype.isUndefined = function(key) {
  return typeof(this[key]) == "undefined";
}
BaseEntity.prototype.isNull = function(key) {
  return !this[key] && typeof(this[key]) != "undefined" && this[key] != 0;
}
BaseEntity.prototype.validate = function() {
  for (var key in this) {
    if (this.hasOwnProperty(key) && this.mapper[key]["notNull"] == true) {

      if (this.isUndefined(key)) {
        return new Response(false, "The value of " + key + " can not be undefined", null);
      }
      if (this.isNull(key)) {
        return new Response(false, "The value of " + key + " can not be null", null);
      }
    }
  }
  return new Response(true, null, null);

}
BaseEntity.prototype.getFieldList = function() {
  var map = {};
  for (var key in this) {
    if (this.hasOwnProperty(key) && !this.isUndefined(key) && !this.isNull(key)) {
      var columnName = this.mapper[key]["column"];
      map[columnName] = this[key];
    }
  }
  return map;
};
module.exports = BaseEntity;