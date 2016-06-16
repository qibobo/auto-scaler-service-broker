var Response = function(success, msg, data) {
  this.success = success;
  this.msg = msg;
  this.data = data;
};
Response.prototype.toString = function() {
  return "Response [ success = " + this.success + ", msg = " + ", data = " + JSON.stringify(data) + " ]";
}
module.exports = Response;