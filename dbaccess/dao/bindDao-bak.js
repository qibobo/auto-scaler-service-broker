var path = require('path');
var Binding = require(path.join(__dirname,'../bean/binding.js'));
var Response = require(path.join(__dirname,'../bean/response.js'));
module.exports = function(connectionString){
	var pg = require("pg");
	var module = {}; 
	var statements = {
		insert : "INSERT INTO binding ",
		select : "SELECT * FROM binding WHERE 1 = 1 ",
		remove : "DELETE FROM binding WHERE 1 = 1 "
		deleteByBindingId : "DELETE FROM binding WHERE binding_id = $1;",
		deleteAll : "DELETE FROM binding;",
		selectByServiceId : "SELECT * FROM binding WHERE service_id = $1;",
		selectByApplicationId : "SELECT * FROM binding WHERE app_id = $1;",
		selectByBingingId : "SELECT * FROM binding WHERE binding_id = $1;",
		selectByTime : "SELECT * FROM binding WHERE timestamp BETWEEN $1 AND $2;",
		selectCount : "SELECT COUNT(*) AS count FROM binding;",
		selectAll : "SELECT * FROM binding;"
	};
	var queryType = {
		insert : "insert",
		remove : "remove",
		select : "select"
	};

	module.add = function(bindingObject, callback){
		if(!(bindingObject instanceof Binding)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		prepare(queryType.insert, bindingObject, callback);
		
	};
	module.get = function(bindingObject, callback){
		if(!(bindingObject instanceof Binding)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		prepare(queryType.select, bindingObject, callback);
	};
	module.remove = function(bindingObject, callback){
		if(!(bindingObject instanceof Binding)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		prepare(queryType.remove, bindingObject, callback);
	};
	function prepare(typeOfQuery, object,callback){
		var map = object.getFieldList();
		if(typeOfQuery == queryType.insert){
			var validateResult = object.validate();
			if(!validateResult.success){
				callback(validateResult);
			}
			var insertStatement = statements.insert;
			var columns = "(";
			var prepareChars = "(";
			var values = new Array();
			var i = 1;
			for( var column in map ){
				columns += column + ",";
				prepareChars += "$" + i++ + ",";
				values.push(map[column]);
			}
			columns = columns.substring(0, columns.length - 1) + ")";
			prepareChars = prepareChars.substring(0,prepareChars.length - 1) + ")";
			insertStatement = insertStatement + columns + " VALUES" + prepareChars;
			console.log("statements=" + insertStatement);
			console.log("values=" + values);
			execute(insertStatement, values, callback);

		}else if(typeOfQuery == queryType.select){
			// var validateResult = object.validate();
			// if(!validateResult.success){
			// 	callback(validateResult);
			// }
			var selectStatement = statements.select;
			var values = new Array();
			var i = 1;
			for( var column in map ){
				selectStatement += " AND " + column + "=$" + i++;
				values.push(map[column]);
			}
			console.log("statements=" + selectStatement);
			console.log("values=" + values);
			execute(selectStatement, values, callback);
		}else if(typeOfQuery == queryType.remove){
			var removeStatement = statement.remove;
			var values = new Array();
			var i = 1;
			for( var column in map ){
				removeStatement += " AND " + column + "=$" + i++;
				values.push(map[column]);
			}
			console.log("statements=" + removeStatement);
			console.log("values=" + values);
			execute(removeStatement, values, callback);

		}	

	}
	function execute(statement, values, callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(new Response(false, err.message, null));
			}
			client.query(statement, values, function(err, result){
				if(err){
					
					console.log(err);
					callback(new Response(false, err.message, null));
					done();
				}
				
				// console.log(result);
				callback(new Response(true, "",result));
				done();
			});
		});
	};
	//{"command":"INSERT","rowCount":1,"oid":0,"rows":[],"fields":[],"_parsers":[],"RowCtor":null,"rowAsArray":false}
	module.insert = function(appId,serviceId,bindingId,timestamp,callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				done();
				console.log(err);
				callback(getResponse(false, err));
			}
			client.query(statements.insert, [appId, serviceId, bindingId, timestamp], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});
		});
	}
	module.deleteByBindingId = function(bindingId,callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				
				console.log(err);
				callback(getResponse(false, err));
				done();
			}
			client.query(statements.deleteByBindingId, [bindingId], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});
		});
	}
	module.deleteAll = function(callback){
		pg.connect(connectionString,function(err, client, done){
			if(err){
				
				console.log(err);
				callback(getResponse(false, err));
				done();
			}
			client.query(statements.deleteAll, function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});
		});
	}
	module.getByBindingId = function(bindingId,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false, err));
	          done();
	        }
	        client.query(statements.selectByBingingId, [bindingId], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	module.getByServiceId = function(serviceId,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false, err));
	          done();
	        }
	        client.query(statements.selectByServiceId, [serviceId], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	module.getByApplicationId = function(applicationId,callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false, err));
	          done();
	        }
	        client.query(statements.selectByApplicationId, [applicationId], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	module.getByTime = function(startTime, endTime, callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false,err));
	          done();
	        }
	        client.query(statements.selectByTime, [startTime, endTime], function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	module.getAll = function(callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false,err));
	          done();
	        }
	        client.query(statements.selectAll, function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	module.getCount = function(callback){
		var results = [];
	    pg.connect(connectionString, function(err, client, done) {
	        if(err) {
	          
	          console.log(err);
	          callback(getResponse(false, err));
	          done();
	        }
	        client.query(statements.selectCount, function(err, result){
				if(err){
					
					console.log(err);
					callback(getResponse(false, err));
					done();
				}
				
				// console.log(result);
				callback(getResponse(true, result));
				done();
			});

	    });
	}
	function getResponse(suc, dat){
		return {success:suc, data: dat};
	}
	
	return module;
}