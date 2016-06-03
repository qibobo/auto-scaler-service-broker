var path = require('path');
module.exports = function(connectionString){
	var pg = require("pg");
	var module = {};
	var statements = {
		insert : "INSERT INTO service_instance(service_id, org_id, space_id) VALUES ($1, $2, $3);",
		getByServiceId : "SELECT * FROM service_instance WHERE service_id = $1;",
		getAll : "SELECT * FROM service_instance;",
		getCount : "SELECT COUNT(*) FROM service_instance;",
		deleteByServiceId : "DELETE FROM service_instance WHERE service_id = $1;",
		deleteAll : "DELETE FROM service_instance;"
	};

	module.insert = function(serviceId, orgId, spaceId, callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.insert, [serviceId, orgId, spaceId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	module.getByServiceId = function(serviceId, callback){
		pg.connect(connectionString, function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.getByServiceId, [serviceId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	module.getAll = function(callback){
		pg.connect(connectionString, function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.getAll, function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	module.getCount = function(callback){
		pg.connect(connectionString, function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.getCount, function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	module.deleteByServiceId = function(serviceId, callback){
		pg.connect(connectionString, function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.deleteByServiceId, [serviceId], function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	module.deleteAll = function(callback){
		pg.connect(connectionString, function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.deleteAll, function(err, result){
				if(err){
					done();
					console.log(err);
					callback(getResponse(false, err));
				}
				done();
				callback(getResponse(true, result));
			});
		});
	}
	function getResponse(suc, dat){
		return {success:suc, data: dat};
	}
	return module;

}