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
}

};



module.exports = postsController;