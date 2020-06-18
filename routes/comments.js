var express = require("express");
var router = express.Router();
//require comment controllers
var projectsController = require('../controllers/comment/commentController');

//POST - User can post comments by Name and Email
router.post('/comments', commentController.postCommentByEmail);

//POST - Flag comments
router.post('/comments/flag/:id', commentController.flagComment);

//GET - Hide all unflagged comments
router.get('/comments/unflagged', commentController.hideFlaggedComments);

module.exports = router;
