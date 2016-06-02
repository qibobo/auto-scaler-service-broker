module.exports = function(){

var fs = require('fs');
var path = require('path');

var settings = JSON.parse(fs.readFileSync( path.join(__dirname, '../config/settings.json'), 'utf8'));
var catalog = JSON.parse(fs.readFileSync( path.join(__dirname, '../config/catalog.json'), 'utf8'));

var module = {};
module.getCatalog = function() {
  catalog.services[0].id=settings.service_id;
  catalog.services[0].name=settings.service_name;
  catalog.services[0].description=settings.service_description;
  catalog.services[0].plans[0].id=settings.plan_id;
  catalog.services[0].plans[0].name=settings.plan_name;
  catalog.services[0].plans[0].description=settings.plan_description;
  return catalog;
 
};





return module;
};