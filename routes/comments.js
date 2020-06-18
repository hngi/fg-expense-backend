var express = require("express");
var router = express.Router();

//require comment controllers
var commentController = require('../controllers/comment/commentController');

// this should have been changed to commentController, i dont want to change it at this point
var projectsController = require('../controllers/comment/commentController');

// GET: route to get all comments for a particular expenses - airon
router.get('/expense/:expense_id/comments', commentController.getAll);

//POST - User can post comments by Name and Email (i.e '/comment')
router.post('/', projectsController.postCommentByEmail);

//POST - Flag comments (i.e '/comment/flag/:id')
router.post('/flag/:id', projectsController.flagComment);

//GET - Hide all unflagged comments (i.e '/comment/unflagged')
router.get('/unflagged', projectsController.hideFlaggedComments);

module.exports = router;
