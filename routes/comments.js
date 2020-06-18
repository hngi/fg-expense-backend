var express = require("express");
var router = express.Router();
//require comment controllers
var projectsController = require('../controllers/comment/commentController');

//POST - User can post comments by Name and Email (i.e '/comment')
router.post('/', projectsController.postCommentByEmail);

//POST replies - user can post reply to a comment
router.post('/:id/reply', projectsController.postReply);

// GET - All comments and replies
router.get('/replies', projectsController.getAllCommentsAndReplies);

//POST - Flag comments (i.e '/comment/flag/:id')
router.post('/flag/:id', projectsController.flagComment);

//GET - Hide all unflagged comments (i.e '/comment/unflagged')
router.get('/unflagged', projectsController.hideFlaggedComments);

module.exports = router;
