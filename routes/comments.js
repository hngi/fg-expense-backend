var express = require("express");
var router = express.Router();

//require comment controllers
var commentController = require("../controllers/comment/commentController");

/*
 * GET: route to get all comments for a particular expense report
 * expense_id should be passed as a query string
 * example: /comments?expense_id=1
 * this adjustment is intended to accommodate the change in route pattern by a team member
 */
router.get("/", commentController.getAll);

//POST - User can post comments by Name and Email (i.e '/comments')
router.post("/", commentController.postCommentByEmail);

// PATCH - Add upvote to comment (i.e '/comments/:id/votes')
router.patch("/:id/votes", commentController.voteComment);

//POST replies - user can post reply to a comment
router.post("/:id/replies", commentController.postReply);

// GET - All comments and replies
router.get("/replies", commentController.getAllCommentsAndReplies);

//POST - Flag comments (i.e '/comments/flag/:id')
router.post("/flag/:id", commentController.flagComment);

//POST - Flag replies (i.e '/comments/flag/reply/:id')
router.post("/flag/reply/:id", commentController.flagReplies);

//GET - Hide all unflagged comments (i.e '/comments/unflagged')
router.get("/unflagged", commentController.hideFlaggedComments);

//GET - Delete Individual comments by ID and Email (I.E '/comment/:id')
router.delete("/:id", commentController.deleteComment);

module.exports = router;
