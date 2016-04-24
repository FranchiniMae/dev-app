var Post = require('../models/post');
var User = require('../models/user');

var postsController = {

index: function (req, res) {
	Post.find({}, function (err, allPosts) {
		err ? console.log(err) : res.json(allPosts);
		console.log('PostIndex backend is working');
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