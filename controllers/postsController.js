var Post = require('../models/post');
var User = require('../models/user');

var postsController = {

index: function (req, res) {
	Post.find({}, function (err, allPosts) {
		err ? console.log(err) : res.json(allPosts);
		console.log('PostIndex backend is working');
	});
},

showfav: function (req, res) {
	User.findById({_id: req.user}, function (err, user) {
		console.log('user from showfav', user.favorites);
		Post.find({_id: {$in: user.favorites}}, function (err, favorites) {
			if (err) console.log(err);
			console.log('favorites', favorites);
			res.send(favorites);
		});
	});
},

userfav: function (req, res) {
	postId = req.params.id;
	console.log('postId', postId);
	User.findById({_id: req.user}, function (err, user) {
		console.log('user', user);
		console.log('indexOf', user.favorites.indexOf(postId));
		if (user.favorites.indexOf(postId) === -1) {
			user.favorites.push(postId);
		}
		user.save(function (err, user) {
			res.send(user);
		});
	});
},

create: function (req, res) {

	User.findById(req.user, function (err, user) {
		var newPost = new Post (req.body);
		newPost.save(function (err, savedPost) {
			if (err) {
				res.status(500).json({ error: err.message});
			} else {
				user.posts.push(newPost);
				user.save();
				res.json(savedPost);
				console.log('post saved under user');
			}
		});
	});
},

delete: function (req, res) {
	var id = req.params.id;
	console.log('id from delete', id);
	Post.findOneAndRemove({_id: id}, function (err, deletedPost) {
		if (err) {
			res.status(500).json({ error: err.message});
		} else {
			res.json(deletedPost);
		}
	});
},

update: function (req, res) {
	var id = req.params.id;
	console.log('id from edit', id);
	Post.findById({_id: id}, function (err, foundPost) {
		if (err) console.log(err);
		foundPost.title = req.body.title;
		foundPost.description = req.body.description;
		foundPost.save(function (err, savedPost) {
			if (err) { console.log (err);}
			res.json(savedPost);
		});
	});
}

};

module.exports = postsController;