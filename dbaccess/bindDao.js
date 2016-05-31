module.exports = function(connectionString){
	var pg = require("pg");
	var module = {}; 
	var statements = {
		insert : "INSERT INTO binding (app_id, service_id, binding_id, timestamp) values ($1,$2,$3,$4);",
		deleteByBindingId : "DELETE FROM binding WHERE binding_id = $1;",
		selectByServiceId : "SELECT * FROM binding WHERE service_id = $1;",
		selectByApplicationId : "SELECT * FROM binding WHERE app_id = $1;",
		selectByBingingId : "SELECT * FROM binding WHERE binding_id = $1;",
		selectByTime : "SELECT * FROM binding WHERE timestamp BETWEEN $1 AND $2;",
		selectCount : "SELECT COUNT(*) AS count FROM binding;",
		selectAll : "SELECT * FROM binding;"
	};

	module.insert = function(data,callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.insert, [data.appId, data.serviceId,data.bindingId,data.timestamp], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});
		});
	}
	module.deleteByBindingId = function(data,callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.deleteByBindingId, [data.bindingId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});
		});
	}
	module.selectByBingingId = function(data,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false, err));
	        }
	        client.query(statements.selectByBingingId, [data.bindingId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });

	}
	module.selectByServiceId = function(data,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false, err));
	        }
	        client.query(statements.selectByServiceId, [data.serviceId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });
	}
	module.selectByApplicationId = function(data,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false, err));
	        }
	        client.query(statements.selectByApplicationId, [data.applicationId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });
	}
	module.selectByTime = function(data,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false,err));
	        }
	        client.query(statements.selectByTime, [data.startTime, data.endTime], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });
	}
	module.selectAll = function(callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false,err));
	        }
	        client.query(statements.selectAll, function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });
	}
	module.count = function(callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          done();
	          console.log(err);
	          callback(getResponse(false, err));
	        }
	        client.query(statements.selectCount, function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				// console.log(result);
				callback(getResponse(true, result));
			});

	    });
	}
	function getResponse(suc, dat){
		return {success:suc, data: dat};
	}
	return module;
}