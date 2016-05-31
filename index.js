var express = require('express');
var fs = require('fs');
var log4js = require('log4js');
var bodyParser = require('body-parser');
var api = new require('./api/api.js')();

var settings = JSON.parse(fs.readFileSync('./config/settings.json', 'utf8'));
var port = process.env.PORT || settings.port;

log4js.configure('./config/log4js.json');
var logger = log4js.getLogger('autoscaler');
logger.setLevel(settings.loggerLevel);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();
router.get('/catalog', function(req, res) {
   api.getCatalog(function(data){
    res.json(data);
    });
});

app.use('/v2', router);
app.listen(port);
