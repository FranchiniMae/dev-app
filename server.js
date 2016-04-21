var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'),
		auth = require('./resources/auth'),
		path = require('path'),
		port = process.env.PORT || 3000;

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect( process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/parent-app');

var User = require('./models/user');