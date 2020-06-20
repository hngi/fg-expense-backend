const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment_report = new Schema(
  {
    minister: [
      {
        type: Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    company_chairman: [
      {
        type: Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ], //this might be a One-to-Many Relationship
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", payment_report);
