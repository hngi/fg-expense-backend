var express = require('express');
var router = express.Router();
var pageController = require('../controllers/pageController');
var userController = require('../controllers/userController');

// Get posts index/posts
router.get('/', pageController.index);
router.get('/users', userController.index);
router.post('/users', userController.newUser);
module.exports = router;
