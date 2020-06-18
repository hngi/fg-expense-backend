var express = require("express");
var router = express.Router();
//require comment controllers
var projectsController = require('../controllers/comment/commentController');

//POST - User can post comments by Name and Email (i.e '/comment')
router.post('/', projectsController.postCommentByEmail);

//POST - Flag comments (i.e '/comment/flag/:id')
router.post('/flag/:id', projectsController.flagComment);

//GET - Hide all unflagged comments (i.e '/comment/unflagged')
router.get('/unflagged', projectsController.hideFlaggedComments);

//GET - Delete Individual comments by ID and Email (I.E '/comment/remove')
router.delete('/remove/:id', projectsController.deleteComment);

module.exports = router;
