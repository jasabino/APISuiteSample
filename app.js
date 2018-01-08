'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var db = require('./config/db');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

var swaggerDocument = yaml.load('./api/swagger/swagger.yaml');

mongoose.Promise = global.Promise;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(bodyParser.json());// For peticiones app Json
app.use(bodyParser.urlencoded({extended: true}));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/api-docs']) {
    console.log('curl: http://localhost:' + port + '/');
    console.log('api docs: http://localhost:' + port + '/api-docs');
  }
});
