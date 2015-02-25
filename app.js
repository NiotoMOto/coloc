'use strict';
var express = require('express');
var cons = require('consolidate');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
// var  io = require('socket.io');

// require('./sockets/chat')(io);
var app = express();
var apiRoutes = express.Router();
var routes = require('./routes/');
require('./routes/api/')(apiRoutes);
app.engine('dust', cons.dust);
app.set('views', __dirname + '/views');
app.set('view engine', 'dust');
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(cors());
app.use('/', routes);
app.use('/api', apiRoutes);
var port = 3001;
app.listen(port, function() {
	console.log('Server listening on port ' + port);
});
