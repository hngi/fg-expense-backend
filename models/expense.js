const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    mdas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mdas",
    },
    companies: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
    expenseAmount: String,
    expenseDesc: String,
    paymentDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
