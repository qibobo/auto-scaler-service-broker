var Sequelize = require('sequelize');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelize = new Sequelize('postgres://postgres:123@127.0.0.1:5433/bindingDB');
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
  var ServiceInstance = sequelize.define('service_instance', {
  serviceId: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'service_id', // Will result in an attribute that is firstName when serviceInstance facing but first_name in the database
  	allowNull: false
  },
  orgId: {
    type: Sequelize.STRING,
    field: 'org_id', // Will result in an attribute that is firstName when serviceInstance facing but first_name in the database
  	allowNull: false
  },
  spaceId: {
    type: Sequelize.STRING,
    field: 'space_id', // Will result in an attribute that is firstName when serviceInstance facing but first_name in the database
  	allowNull: false
  },
}, {
	timestamps: false,
  	freezeTableName: true // Model tableName will be the same as the model name
});
  var sequenceFunction = async (function(){
    var addResult = await (ServiceInstance.create({serviceId:'123',orgId:'456',spaceId:'789'}));
    console.log('addResult' + JSON.stringify(addResult));
    var serviceInstance = await (ServiceInstance.findById('123'));
    console.log('instance is ' + JSON.stringify(serviceInstance));
    console.log('get serviceInstance by id:' + serviceInstance.get('orgId'));
    var updateCount = await (ServiceInstance.findAll());
    console.log('get all, count is' + updateCount.length);
  });
  sequenceFunction();