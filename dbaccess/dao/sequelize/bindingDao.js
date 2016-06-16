var Sequelize = require('sequelize');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var BindingDao = function(connectionStr) {
  // this.sequelize = new Sequelize('postgres://postgres:123@127.0.0.1:5433/bindingDB');
  this.sequelize = new Sequelize(connectionStr);
  this.Binding = this.sequelize.define('binding', {
    bindingId: {
      type: Sequelize.STRING,
      primaryKey: true,
      field: 'binding_id',
      allowNull: false
    },
    appId: {
      type: Sequelize.STRING,
      field: 'app_id',
      allowNull: false
    },
    serviceId: {
      type: Sequelize.STRING,
      field: 'service_id',
      allowNull: false
    },
    timestamp : {
      type: Sequelize.STRING,
      field: 'timestamp',
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
BindingDao.prototype.getByBindingId = async(function(bindingId) {
  var binding = await (this.Binding.findById(bindingId));
  return binding;
});
BindingDao.prototype.getAll = async(function() {
  var bindingArray = await (this.Binding.findAll());
  return bindingArray;
});
BindingDao.prototype.add = async(function(bindingId, appId, serviceId) {
  var addCount = await (this.Binding.create({
    bindingId: bindingId,
    appId: appId,
    serviceId: serviceId,
    timestamp: new Date().getTime()
  }));
  return addCount;
});
BindingDao.prototype.removeByBindingId = async(function(bindingId) {
  var updateCount = await (this.Binding.destroy({
    where: {
      bindingId: bindingId
    }
  }));
  return updateCount;
});
BindingDao.prototype.removeAll = async(function() {
  var updateCount = await (this.Binding.truncate({ cascade: true, }));
  return updateCount;
});
BindingDao.prototype.countByBindingId = async(function(bindingIdP) {
  var count = await (this.Binding.count({ where: {
    bindingId: bindingIdP
  } }));
  return count;
});

module.exports = BindingDao;