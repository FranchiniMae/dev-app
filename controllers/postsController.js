var Post = require('../models/post');

var postsController = {

index: function (req, res) {
	Post.find({}, function (err, allPosts) {
		err ? console.log(err) : res.json(allPosts);
		console.log('PostIndex backend is working');
	});
},

create: function (req, res) {
	console.log('creating post');
	var title = req.body.title;
	var description = req.body.description;
	Post.create({title: title, description: description}, function (err, newPost) {
		console.log(newPost);
		err ? console.log(err) : res.json(newPost);
	});
}

};



module.exports = postsController;