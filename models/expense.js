const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    MDA: [
      {
        type: Schema.Types.ObjectId,
        ref: "MDA",
      },
    ],
    Minister: [
      {
        type: Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    companies: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    company_chairman: [
      {
        type: Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
