var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var async  = require('asyncawait/async');
var await = require('asyncawait/await');

// This agent refers to PORT where program is runninng.
var settings = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../config/settings.json'), 'utf8'));
var dbUser = settings.postgresql_username;
var dbPwd = settings.postgresql_password;
var dbHost = settings.postgresql_host;
var dbPort = settings.postgresql_port;
var dbName = settings.postgresql_dbName;
var connectionStr = "postgres://" + dbUser + ":" + dbPwd + "@" + dbHost + ":" + dbPort + "/" + dbName;
var ServiceInstanceDao = new require(path.join(__dirname, '../../dao/sequelize/serviceInstanceDao.js'));
var serviceInstanceDao = new ServiceInstanceDao(connectionStr);

describe('Unit Test for serviceInstanceDAO', function() {
  this.timeout(15000);
  beforeEach(function(done) {
    
    serviceInstanceDao.removeAll();
    done();
  });
  it('get should return a empty list with a empty serviceInstance table', async (function(done) {
   
    var list = await (serviceInstanceDao.getAll());
    list.length.should.equal(0);
     done();


  }));
  it('insert a new ServiceInstanceData, and return 1 element with get', async (function(done) {
    
    var serviceId = uuid.v4();
    var orgId = uuid.v4();
    var spaceId = uuid.v4();
    await (serviceInstanceDao.add(serviceId, orgId, spaceId));
    var instance = await (serviceInstanceDao.getByServiceId(serviceId));
    instance.get('serviceId').should.equal(serviceId);
    instance.get('orgId').should.equal(orgId);
    instance.get('spaceId').should.equal(spaceId);
    done();


  }));
  it('insert a new ServiceInstanceData, and return empty after remove', async (function(done) {
    
    var serviceId = uuid.v4();
    var orgId = uuid.v4();
    var spaceId = uuid.v4();
    await (serviceInstanceDao.add(serviceId, orgId, spaceId));
    await (serviceInstanceDao.removeByServiceId(serviceId));
    var count = await (serviceInstanceDao.countByServiceId(serviceId));
    count.should.equal(0);
    done();
  }));
});