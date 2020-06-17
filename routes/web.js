var express = require('express')
var router = express.Router();
var pageController = require('../controllers/pageController');
var userController = require('../controllers/userController');


// Get posts index/posts
router.get('/', pageController.index);
router.get('/users', userController.index);

//POST - Create new user
router.post('/user', userController.createUser);
//POST - User can post comments by Name and Email
router.post('/comments', userController.postCommentByEmail);

module.exports = router;