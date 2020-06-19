const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MDASchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tweet_handle: {
      type: String,
      required: true,
    },
    Head: [
      {
        type: Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    Projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    // companies: [{
    //    type: Schema.Types.ObjectId,
    //    ref: 'Company'
    // }], Since the Projects has the details of the companies
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ], //this might be a One-to-Many Relationship
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MDA", MDASchema);
