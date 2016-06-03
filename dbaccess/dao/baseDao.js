var pg = require("pg");
var path = require("path");
var Response = require(path.join(__dirname,'../bean/response.js'));
var BaseDao = function(connectionString, statements){
	this.connectionString = connectionString;
	this.statements = statements;
};
var queryType = {
	insert : "insert",
	remove : "remove",
	select : "select",
	count : "count"
};
BaseDao.prototype.add = function(entity, entityType, callback){
		if(!(entity instanceof entityType)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		this.prepare(queryType.insert, entity, entityType, callback);
		
	};
BaseDao.prototype.get = function(entity, entityType, callback){
		if(!(entity instanceof entityType)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		this.prepare(queryType.select, entity, entityType,callback);
	};
BaseDao.prototype.remove = function(entity, entityType,callback){
		if(!(entity instanceof entityType)){
			callback(new Response(false, "Input object is not a instance of Binding" , null));			
		}
		this.prepare(queryType.remove, entity, entityType,callback);
	};
BaseDao.prototype.prepare = function(typeOfQuery, object, entityType, callback){
		var map = object.getFieldList();
		if(typeOfQuery == queryType.insert){
			var validateResult = object.validate();
			if(!validateResult.success){
				callback(validateResult);
			}
			var insertStatement = this.statements.insert;
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
			// console.log("statements=" + insertStatement);
			// console.log("values=" + values);
			this.execute(insertStatement, values, entityType, callback);

		}else if(typeOfQuery == queryType.select){
			// var validateResult = object.validate();
			// if(!validateResult.success){
			// 	callback(validateResult);
			// }
			var selectStatement = this.statements.select;
			var values = new Array();
			var i = 1;
			for( var column in map ){
				selectStatement += " AND " + column + "=$" + i++;
				values.push(map[column]);
			}
			// console.log("statements=" + selectStatement);
			// console.log("values=" + values);
			this.execute(selectStatement, values, entityType, callback);
		}else if(typeOfQuery == queryType.remove){
			var removeStatement = this.statements.remove;
			var values = new Array();
			var i = 1;
			for( var column in map ){
				removeStatement += " AND " + column + "=$" + i++;
				values.push(map[column]);
			}
			// console.log("statements=" + removeStatement);
			// console.log("values=" + values);
			this.execute(removeStatement, values, entityType, callback);

		}	
		object = null;
	};

BaseDao.prototype.execute = function(statement, values, entityType, callback){
		pg.connect(this.connectionString,function(err, client, done){
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
				// callback(new Response(true, "",result));
				parseObject(result, entityType, callback);
				done();
			});
		});
	};
function parseObject(data, entityType, callback){
	//{"command":"INSERT","rowCount":1,"oid":0,"rows":[],"fields":[],"_parsers":[],"RowCtor":null,"rowAsArray":false}
	//{"command":"DELETE","rowCount":11,"oid":null,"rows":[],"fields":[],"_parsers":[],"RowCtor":null,"rowAsArray":false}
	//{"command":"SELECT","rowCount":2,"oid":null,"rows":[{"app_id":"4b8c87a5-2f2c-4ace-86c7-41a64d7b47a5","service_id":"2b9b20fd-9650-479e-9421-85265179f50b","binding_id":"3b424e6f-891f-420e-87f1-0980fc410ef8","timestamp":"1464930437125"},{"app_id":"cf5fb832-b021-4053-8ce8-516cfcb94b7c","service_id":"641ff10a-f781-46f8-bc04-55bbaf7c5945","binding_id":"7ee99b9f-2f0b-40c5-a466-7774c4a988eb","timestamp":"1464930438992"}],"fields":[{"name":"app_id","tableID":24727,"columnID":1,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":44,"format":"text"},{"name":"service_id","tableID":24727,"columnID":2,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":44,"format":"text"},{"name":"binding_id","tableID":24727,"columnID":3,"dataTypeID":1043,"dataTypeSize":-1,"dataTypeModifier":44,"format":"text"},{"name":"timestamp","tableID":24727,"columnID":4,"dataTypeID":20,"dataTypeSize":8,"dataTypeModifier":-1,"format":"text"}],"_parsers":[null,null,null,null],"rowAsArray":false}
	var cmd = data.command;
	if(cmd == "DELETE" || cmd == "INSERT" || cmd == "UPDATE"){
		callback(new Response(true, "", {rowCount:data.rowCount,rows:[]}));
	}else if(cmd == "SELECT"){
		var rows = data.rows;
		var resultData = [];
		var mapper = entityType.prototype.mapper;
		for(var i = 0; i < rows.length; i++){
			var entity = new entityType();
			for(key in entity){
				if(entity.hasOwnProperty(key)){
					entity[key] = rows[i][mapper[key].column];
				}
			}
			resultData.push(entity);
		}
		callback(new Response(true, "", {rowCount: data.rowCount,rows:resultData}));
	}
		
}
module.exports = BaseDao;