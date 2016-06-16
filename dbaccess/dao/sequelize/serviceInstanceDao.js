var Sequelize = require('sequelize');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ServiceInstanceDao = function(connectionStr) {
  // this.sequelize = new Sequelize('postgres://postgres:123@127.0.0.1:5433/bindingDB');
  this.sequelize = new Sequelize(connectionStr);
  this.ServiceInstance = this.sequelize.define('service_instance', {
    serviceId: {
      type: Sequelize.STRING,
      primaryKey: true,
      field: 'service_id',
      allowNull: false
    },
    orgId: {
      type: Sequelize.STRING,
      field: 'org_id',
      allowNull: false
    },
    spaceId: {
      type: Sequelize.STRING,
      field: 'space_id',
      allowNull: false
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
ServiceInstanceDao.prototype.getByServiceId = async (function(serviceId) {
  var serviceInstance = await (this.ServiceInstance.findById(serviceId));
  return serviceInstance;
});
ServiceInstanceDao.prototype.getAll = async (function() {
  var serviceInstanceArray = await (this.ServiceInstance.findAll());
  return serviceInstanceArray;
});
ServiceInstanceDao.prototype.add = async (function(serviceIdP, orgIdP, spaceIdP) {
  var addedInstance = await (this.ServiceInstance.create({
    serviceId: serviceIdP,
    orgId: orgIdP,
    spaceId: spaceIdP
  }));
  return addedInstance;
});
ServiceInstanceDao.prototype.removeByServiceId = async (function(serviceId) {
  var updateCount = await (this.ServiceInstance.destroy({
    where: {
      serviceId: serviceId
    }
  }));
  return updateCount;
});
ServiceInstanceDao.prototype.removeAll = async (function() {
  var updateCount = await (this.ServiceInstance.truncate({ cascade: true, }));
  return updateCount;
});
ServiceInstanceDao.prototype.countByServiceId = async (function(serviceIdP) {
  var count = await (this.ServiceInstance.count({ where: {
    serviceId: serviceIdP
  } }));
  return count;
});

module.exports = ServiceInstanceDao;