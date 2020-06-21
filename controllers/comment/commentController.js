const Request = require("request");
const fetch = require("node-fetch");

let rp = require("request-promise");

const commentModel = require("../../models/Comment");
const replyModel = require("../../models/reply");

// The url to the comments API.
const commentsAPIUrl = "https://fgn-comments-service.herokuapp.com";

/**
 * export.method = req, res function
 * get all comments on a particular expense report from comments microservice
 */
exports.getAll = [
  async function (req, res) {
    let expense_id = req.query.expense_id;

    try {
      var options = {
        uri: `https://my-json-server.typicode.com/airondev/json-server/expenses/${expense_id}/comments`, //this will be replaced with uri to comments api service
        headers: {
          "User-Agent": "Request-Promise",
        },
        json: true, // Automatically parses the JSON string in the response
      };

      const comments = await rp(options)
        .then(function (comments) {
          return comments;
        })
        .catch(function (err) {
          // API call failed...
          res.json({
            status: false,
            error: err.name,
            message: err.message,
          });
        });

      if (comments) {
        res.json({
          status: true,
          comments: comments,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
];

// comments should be added here - thanks
exports.postCommentByEmail = async (req, res) => {
  const { comment, name, email, reportId } = req.body;
  const comment_body = comment;
  const comment_owner_username = name;
  const report_id = reportId;
  const comment_owner_email = email;
  const comment_origin = " ";
  const url = "https://fgn-comments-service.herokuapp.com/tweet/comment/create";

  const data = {
    comment_body,
    comment_origin,
    comment_owner_username,
    report_id,
    comment_owner_email,
  };

  await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((comment) => {
      res.status(200).json({
        status: "Successful",
        data: comment,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(400).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    });
};

// Update votes on comment
exports.voteComment = (req, res) => {
  const options = {
    url: `${commentsAPIUrl}/reports/comment/vote/${req.params.id}`,
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
    json: true,
    body: req.body,
  };

  Request(options, function (err, _, body) {
    if (err) {
      res.status(400).json({ status: "Failed", message: err, data: null });
    } else {
      res.status(202).json(body);
    }
  });
};

exports.postReply = async (req, res) => {
  const { reply, email } = req.body;
  try {
    const replyDetails = new replyModel({ reply, email });
    replyDetails.noOfReplies += 1;
    await replyDetails.save().then((reply) => {
      console.log(reply);
      commentModel.findById({ _id: req.params.id }).then((comment) => {
        console.log(comment.replies, reply.id);
        comment.replies.unshift(reply);
        comment
          .save()
          .then((details) =>
            res.json({ status: "Success", msg: "Reply posted", data: details })
          );
      });
    });
  } catch (e) {
    res
      .status(400)
      .json({ status: "Failed", message: `${e.message}`, data: null });
  }
};

//return all comments and replies without flags
exports.getAllCommentsAndReplies = (req, res) => {
  const id = req.params.id;
  const url = `https://fgn-comments-service.herokuapp.com/report/comments/${id}`;
  Request.get(url, (error, response, body) => {
    if (error) {
      return res
        .status(400)
        .json({ status: "Failed", message: error.message, data: null });
    }
    console.dir(body);
    return res.json({
      status: "Success",
      msg: "All comments and replies",
      data: body,
    });
  });
};

//Flag a comment
exports.flagComment = async (req, res) => {
  const id = req.params.id;
  const url = `https://fgn-comments-service.herokuapp.com/reports/comment/flag/${id}`;
  const data = { is_flagged: true };

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json({ status: "Success", message: "Comment Flagged", data });
    })
    .catch((e) => {
      console.error("Error:", e);
      res
        .status(400)
        .json({ status: "Failed", message: `${e.message}`, data: null });
    });
};

//This retrieves only unflagged comments
exports.hideFlaggedComments = (req, res) => {
  commentModel
    .find()
    .then((comments) => {
      const filteredComments = comments.reduce(
        (a, o) => (
          !o.flag &&
            a.push({
              _id: o._id,
              comment: o.comment,
              name: o.name,
              email: o.email,
              flag: o.flag,
              numOfFlags: o.numOfFlags,
              upVotes: o.upVotes,
              downVotes: o.downVotes,
            }),
          a
        ),
        []
      );
      return res.json({
        status: "Success",
        message: "All Unflagged Comments",
        data: filteredComments,
      });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: "Failed", message: err.message, data: null })
    );
};

//Flag a reply
exports.flagReplies = async (req, res) => {
  const id = req.params.id;
  const url = `https://fgn-comments-service.herokuapp.com/reports/comment/reply/flag/${id}`;
  const data = { is_flagged: true };

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json({ status: "Success", message: "Reply Flagged", data });
    })
    .catch((e) => {
      console.error("Error:", e);
      res
        .status(400)
        .json({ status: "Failed", message: `${e.message}`, data: null });
    });
};

exports.deleteComment = async (req, res) => {
  try {
    const deleteComment = await commentModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteComment)
      return res.status(404).json({
        status: "Failed",
        message: "Failed to delete comment: comment not found",
        data: null,
      });
    res
      .status(200)
      .json({ status: "Sucess", message: "Comment deleted", data: null });
  } catch (e) {
    res
      .status(400)
      .json({ status: "Failed", message: `${e.message}`, data: null });
  }
};
