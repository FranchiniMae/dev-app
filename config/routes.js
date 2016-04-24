var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    router = express.Router(),
    auth = require('../resources/auth'),
    usersController = require('../controllers/usersController'),
    postsController = require('../controllers/postsController');

router.route('/api/posts')
	.get(postsController.index)
	.post(auth.ensureAuthenticated, postsController.create);

router.route('/api/me/posts')
	.get(auth.ensureAuthenticated, usersController.showPosts);

module.exports = router;