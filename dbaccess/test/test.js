var http = require('http');
var uuid = require('uuid');
var path = require('path');
var await = require('asyncawait/await');
var Binding = require(path.join(__dirname,'../bean/binding.js'));
var conString = "postgres://postgres:123@127.0.0.1:5433/bindingDB";
var BindDao = require(path.join(__dirname, '../dao/bindDao.js'));
function showResult(result){
	
	res.writeHead(200, {'content-type': 'text/plain'});
    res.end('count' + result);
}
var server = http.createServer(function(req, res) {
	var result = {};
	// console.log(Binding.prototype.mapper);
	// console.log(new Binding());
	// dao.count(function(data){
	// 	res.writeHead(200, {'content-type': 'text/plain'});
 //    	res.end('count:' + JSON.stringify(data) + '\n');
	// });
	var dao = new BindDao(conString);
	dao.get(new Binding(null,null,null,null),function(data){
		res.writeHead(200, {'content-type': 'text/plain'});
    	res.end('insert:' + JSON.stringify(data) + '\n');
	});
	// dao.remove(new Binding(null,null,null,null),function(data){
	// 	res.writeHead(200, {'content-type': 'text/plain'});
 //    	res.end('insert:' + JSON.stringify(data) + '\n');
	// });
	for(var i = 0; i <= 1000000; i++){
		// console.log(binding.toString());
		dao.add(new Binding(i,i,i,2345),function(data){});
	}
	res.writeHead(200, {'content-type': 'text/plain'});
    	res.end('insert:'+'\n');
	// console.log(new Binding(uuid.v4()+"",uuid.v4(),uuid.v4(),new Date().getTime()).toString());
	// console.log(new BindDao(conString).get();
	// dao.selectAll(function(data){
	// 	// var length = data['data']['rows'].length;
	// 	// console.log('current total is' + length);
	// 	console.log(JSON.stringify(data));
	// 	var bindingId1 = data['data']['rows'][0].binding_id;
	// 	console.log('bindingId' + bindingId1);
	// 	dao.selectByBingingId({bindingId:bindingId1},function(data1){
	// 		var bindObj = data1['data']['rows'][0];
	// 		if(bindObj.binding_id == bindingId1){
	// 			dao.deleteByBindingId({bindingId:bindingId1},function(data2){
	// 				console.log('delete binding id ' + bindingId1);
	// 				res.writeHead(200, {'content-type': 'text/plain'});
 //    				res.end('delete:' + JSON.stringify(data2) + '\n');
	// 			});
	// 		}else{
	// 			console.log('bindingId ' + bindingId1 + ' does not exist');
	// 			res.writeHead(500, {'content-type': 'text/plain'});
 //    			res.end('delete fail:' + JSON.stringify(data2)+ '\n');
	// 		}
	// 	});
	// });
	// dao.selectByServiceId({serviceId:uuid.v4()}, function(data){
		
 //    	res.end('select:' + data.success + JSON.stringify(data) + '\n');
	// });
});
server.listen(3000);