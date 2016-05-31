var express = require('express');
var fs = require('fs');
var log4js = require('log4js');
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
var port = process.env.PORT || 8080;
log4js.configure('log4js.json');
var catalog = {"service":"autoscaler"};
//var catalog = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

var logger = log4js.getLogger('autoscaler');
logger.setLevel(settings.loggerLevel);
var port = (process.env.VMC_APP_PORT || process.env.VCAP_APP_PORT || settings.port);
var host = (process.env.VCAP_APP_HOST || 'localhost');
logger.info("host:port=="+host+":"+port);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
router.get('/catalog', function(req, res) {
    res.json(catalog);   
});
app.use('/v2', router);
app.listen(port);
