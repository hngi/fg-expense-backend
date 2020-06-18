var express = require('express');
var router = express.Router();
//require comment controllers
var commentController = require('../controllers/comment/commentController');


// GET: route to get all comments for a particular expenses
router.get('/expense/:expense_id/comments', commentController.getAll)

module.exports = router;
