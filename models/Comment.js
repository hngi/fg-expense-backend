const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  flag: {
    type: Boolean,
    default: false,
  },
  numOfFlags: {
    type: Number,
    default: 0,
  },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
