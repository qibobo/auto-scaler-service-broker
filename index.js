var express = require('express');
var fs = require('fs');
var path = require("path");
var log4js = require('log4js');
var bodyParser = require('body-parser');
var api = new require('./api/api.js')();
var utils = require(path.join(__dirname, 'utils/utils.js'));

var settings = JSON.parse(fs.readFileSync('./config/settings.json', 'utf8'));
var port = process.env.PORT || settings.port;

log4js.configure('./config/log4js.json');
var logger = log4js.getLogger('autoscaler');
logger.setLevel(settings.loggerLevel);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(error, req, res, next) {
  //Catch bodyParser error
  if (error.message.indexOf("Unexpected token") >= 0) {
    res.status(utils.status.parseJsonError).json({ "error": "Json Parse error" });
  } else {
    next();
  }
});

var router = express.Router();
router.get('/catalog', function(req, res) {
  api.getCatalog(function(data) {
    res.json(data);
  });
});
router.put('/service_instances/:serviceId', function(req, res) {
  var serviceId = req.params.serviceId;
  var orgId = req.body.organization_guid;
  var spaceId = req.body.space_guid
  api.provision(serviceId, orgId, spaceId, function(response) {
    if (response.success === true) {
      res.status(utils.status.create).json(response);
    } else {
      res.status(utils.status.error).json(response);
    }

  });
});
router.delete('/service_instances/:serviceId', function(req, res) {
  var serviceId = req.params.serviceId;
  api.deprovision(serviceId, function(response) {
    if (response.success === true) {
      res.status(utils.status.ok).json(response);
    } else {
      res.status(utils.status.error).json(response);
    }
  });
});
router.put('/service_instances/:serviceId/service_bindings/:bindingId', function(req, res) {
  var serviceId = req.params.serviceId;
  var bindingId = req.params.bindingId;
  var appId = req.body.app_guid;
  api.bind(serviceId, bindingId, appId, function(response) {
    if (response.success === true) {
      res.status(utils.status.create).json(response);
    } else {
      res.status(utils.status.error).json(response);
    }
  });
});
router.delete('/service_instances/:serviceId/service_bindings/:bindingId', function(req, res) {
  var serviceId = req.params.serviceId;
  var bindingId = req.params.bindingId;
  api.unbind(serviceId, bindingId, function(response) {
    if (response.success === true) {
      res.status(utils.status.create).json(response);
    } else {
      res.status(utils.status.error).json(response);
    }
  });
});
app.use('/v2', router);
app.listen(port);