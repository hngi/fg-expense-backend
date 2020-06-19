var express = require("express");
var router = express.Router();

//require comment controllers
var commentController = require("../controllers/comment/commentController");

// this should have been changed to commentController, i dont want to change it at this point
var projectsController = require("../controllers/comment/commentController");

/* 
* GET: route to get all comments for a particular expense report
* expense_id should be passed as a query string 
* example: /comments?expense_id=1
* this adjustment is intended to accommodate the change in route pattern by a team member
*/
router.get("/", commentController.getAll);

//POST - User can post comments by Name and Email (i.e '/comment')
router.post("/", projectsController.postCommentByEmail);

// PUT - Upvote comment (i.e '/comment/:id/upvotes')
router.put("/:id/upvotes", projectsController.upvoteComment);

//POST replies - user can post reply to a comment
router.post("/:id/replies", projectsController.postReply);

// GET - All comments and replies
router.get("/replies", projectsController.getAllCommentsAndReplies);

//POST - Flag comments (i.e '/comment/flag/:id')
router.post("/flag/:id", projectsController.flagComment);

//GET - Hide all unflagged comments (i.e '/comment/unflagged')
router.get("/unflagged", projectsController.hideFlaggedComments);

//GET - Delete Individual comments by ID and Email (I.E '/comment/:id')
router.delete("/:id", projectsController.deleteComment);

module.exports = router;
