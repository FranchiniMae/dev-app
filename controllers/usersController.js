var User = require('../models/user');
var Post = require('../models/post');

var usersController = {

showPosts: function (req, res) {
  console.log('req.user', req.user);
  User.findById({_id: req.user}, function (err, user) {
    Post.find({_id: {$in: user.posts}}, function(err, posts) {
      if (err) console.log(err);
      res.send(posts);
    });
  });
} 

};

module.exports = usersController;