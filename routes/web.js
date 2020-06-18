var express = require('express');
var router = express.Router();
//demo data
//var userController = require('../controllers/userController');
var mdaController = require('../controllers/web/mdaController');


// demo route
//router.post('/users', userController.newUser);
router.get('/mda',mdaController.getMinistries)
module.exports = router;
