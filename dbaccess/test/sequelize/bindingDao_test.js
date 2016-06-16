var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

// This agent refers to PORT where program is runninng.
var settings = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../config/settings.json'), 'utf8'));
var dbUser = settings.postgresql_username;
var dbPwd = settings.postgresql_password;
var dbHost = settings.postgresql_host;
var dbPort = settings.postgresql_port;
var dbName = settings.postgresql_dbName;
var connectionStr = "postgres://" + dbUser + ":" + dbPwd + "@" + dbHost + ":" + dbPort + "/" + dbName;
var BindingDao = new require(path.join(__dirname, '../../dao/sequelize/bindingDao.js'));
var bindingDao = new BindingDao(connectionStr);
var ServiceInstanceDao = new require(path.join(__dirname, '../../dao/sequelize/serviceInstanceDao.js'));
var serviceInstanceDao = new ServiceInstanceDao(connectionStr);

describe('Unit Test for bindingDAO', function() {
  beforeEach(async (function(done) {
    await (bindingDao.removeAll());
    await (serviceInstanceDao.removeAll());
    await (serviceInstanceDao.add(uuid.v4(),uuid.v4(),uuid.v4()));
    done();
  }));
  it('get should return a empty list with a empty binding table', async(function(done) {

    var list = await (bindingDao.getAll());
    list.length.should.equal(0);
    done();


  }));
  it('insert a new BindingData, and return 1 element with get', async(function(done) {

    var bindingId = uuid.v4();
    var appId = uuid.v4();
    var serviceList = await (serviceInstanceDao.getAll());
    serviceList.length.should.equal(1);
    var serviceId = serviceList[0].get('serviceId');
    await (bindingDao.add(bindingId, appId, serviceId));
    var instance = await (bindingDao.getByBindingId(bindingId));
    instance.get('bindingId').should.equal(bindingId);
    instance.get('appId').should.equal(appId);
    instance.get('serviceId').should.equal(serviceId);


    done();

  }));
  it('insert a new BindingData, and return empty after remove', async(function(done) {
    var bindingId = uuid.v4();
    var appId = uuid.v4();
    var serviceList = await (serviceInstanceDao.getAll());
    serviceList.length.should.equal(1);
    var serviceId = serviceList[0].get('serviceId');
    await (bindingDao.add(bindingId, appId, serviceId));
    await (bindingDao.removeByBindingId(bindingId));
    var count = await (bindingDao.countByBindingId(bindingId));
    count.should.equal(0);
    done();
  }));
});