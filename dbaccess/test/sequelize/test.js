
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

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

var list = serviceInstanceDao.getAll();
console.log(JSON.stringify(list));
serviceInstanceDao.sequenceFunction();