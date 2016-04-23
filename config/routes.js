var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    router = express.Router(),
    auth = require('../resources/auth'),
    usersController = require('../controllers/usersController'),
    postsController = require('../controllers/postsController');


    module.exports = router;