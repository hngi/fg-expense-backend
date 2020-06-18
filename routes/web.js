var express = require('express');
var router = express.Router();
//demo data
var userController = require('../controllers/userController');


// Get posts index/posts
router.get('/',  pageController.index);
//router.get('/users', userController.index);

//POST - Create new user
router.post('/user',  userController.createUser);

//GET - Get all users
router.get('/users',  userController.getAllUsers);

//POST - User can post comments by Name and Email
router.post('/comments', userController.postCommentByEmail);

//GET - Get all comments
router.get('/comments', userController.getAllComments);

//POST - Flag comments
router.post('/comments/flag/:id', userController.flagComment);

module.exports = router;
