
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
