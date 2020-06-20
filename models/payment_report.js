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
    project: {
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
    amount: { type: Schema.Types.Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", payment_report);
