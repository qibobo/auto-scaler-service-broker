var express = require('express');
var fs = require('fs');
var log4js = require('log4js');
var bodyParser = require('body-parser');
var api = new require('./api/api.js')();

var settings = JSON.parse(fs.readFileSync('./config/settings.json', 'utf8'));
var port = process.env.PORT || settings.port;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
router.get('/catalog', function(req, res) {
	res.json(api.getCatalog());
});

app.use('/v2', router);
app.listen(port);
