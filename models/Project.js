const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    MDAs: [
      {
        type: Schema.Types.ObjectId,
        ref: "MDA",
      },
    ],
    Companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    // Projects: [{
    // type: Schema.Types.ObjectId,
    // ref: 'Project'
    // }], Since the MDA has Projects in them...
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    expenses: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
