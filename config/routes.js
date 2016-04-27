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

router.route('/api/favorites')
    .get(auth.ensureAuthenticated, postsController.showfav);

router.route('/api/favorites/:id')
    .delete(auth.ensureAuthenticated, postsController.removefav);

router.route('/api/posts/:id')
	.delete(postsController.delete)
	.put(postsController.update)
    .post(auth.ensureAuthenticated, postsController.userfav);

router.route('/api/me/posts')
	.get(auth.ensureAuthenticated, usersController.showPosts);

module.exports = router;