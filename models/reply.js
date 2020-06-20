const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  reply: {
    type: String,
    required: true,
  },
  numOfReplies: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
});

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;
