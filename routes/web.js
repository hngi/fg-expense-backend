var express = require('express');
var router = express.Router();
//demo data
var userController = require('../controllers/userController');

// demo route
router.post('/users', userController.newUser);
module.exports = router;
