'use strict';
var express = require('express');
var cons = require('consolidate');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./models/');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var env = process.env.NODE_ENV || 'development';
var session = require('cookie-session');

var routes = require('./routes/');
var back = require('./back/lib/');

passport.use(new LocalStrategy(
	function (username, password, done) {
		models.User.find({
			where: {
				username: username
			}
		}).then(function (user, err) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username.'
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}
			return done(null, user);
		});
	}
	));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});


var auth = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.sendStatus(401);
	} else {
		next();
	}
};

// require('./sockets/chat')(io);
var app = express();
var apiRoutes = express.Router();

require('./routes/api/')(apiRoutes);
app.engine('dust', cons.dust);
app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser
	.urlencoded({
	extended: true
}));
app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(cors({
	origin: 'http://localhost:9000',
	credentials: true
}));
app.use(session({ secret: 'securedsession' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/app', back);
app.use('/api', auth);
app.use('/api', apiRoutes);


app.use(express.static(path.join(__dirname, './back/')));
app.use(express.static(path.join(__dirname, './back/app/')));
app.get('/back', function (req, res) {
	res.sendfile('index.html', { root: './back/app/' });
});

var port = 3001;
app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
