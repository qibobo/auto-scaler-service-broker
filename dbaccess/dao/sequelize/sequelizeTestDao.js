var Sequelize = require('sequelize');
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

// ServiceInstance.sync({force: true}).then(function () {
//   // Table created
//   return ServiceInstance.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });
ServiceInstance.findById('00321085-7874-469d-876c-b95816fc1dd9').then(function (serviceInstance) {
    console.log("------0----->" + serviceInstance.get('orgId'));
});
ServiceInstance.findOne({
  where: {
    serviceId: '00321085-7874-469d-876c-b95816fc1dd9',
    orgId: '5cc9b0f3-2be8-4289-8292-047eea0bd39b',
    spaceId:{
    	$ne: null
    }
  }
}).then(function (serviceInstance) {
    console.log("------1----->" + serviceInstance.get('orgId'));
});
ServiceInstance.findAll({
  where: {
    serviceId: '00321085-7874-469d-876c-b95816fc1dd9',
    orgId: '5cc9b0f3-2be8-4289-8292-047eea0bd39b'
  },
  //attributes : ['service_id',['org_id','orgIdId']],
}).then(function (serviceInstance) {
    console.log("------2----->" + serviceInstance.length);
});
ServiceInstance.findAndCountAll().then(function(result) {
    console.log("-----3-----" + result.count);
    // console.log("------3-----" + result.rows);
  });
ServiceInstance.count().then(function(result){
	console.log("-----4------" + result);
});
ServiceInstance.findAll({ offset: 5, limit: 5 }).then(function (serviceInstance) {
    console.log("------5----->" + serviceInstance.length);
});
ServiceInstance.update({
	serviceId:'123',
	orgId:'345'
},
	{where: {
    serviceId: '00321085-7874-469d-876c-b95816fc1dd9',
    orgId: '5cc9b0f3-2be8-4289-8292-047eea0bd39b'
  }}).then(function (count) {
    console.log("------6----->" + count);
});
  ServiceInstance.destroy(
	{where: {
    serviceId: '00321085-7874-469d-876c-b95816fc1dd9',
    orgId: '5cc9b0f3-2be8-4289-8292-047eea0bd39b'
  }}).then(function (count) {
    console.log("------7----->" + count);
});
