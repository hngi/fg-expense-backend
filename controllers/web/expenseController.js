/**
 * export.method = req, res function
 *
 */

const Expenses = require('../../models/expense');
var ObjectId = require('mongoose').Types.ObjectId;
exports.getExpenses = (req, res, next) => {
  Expenses.find({ companies: ObjectId('5eec6cda730352ba558b1852') })
    .populate('mdas')
    .then((expenses) => {
      let data = {
        project: expenses.expenseDesc,
        projectAmt: expenses.expenseAmount,
        paymentDate: expenses.paymentDate,
        mda: expenses.mda,
        company: expenses.companies,
      };
      res.send(expenses);
    })
    .catch(next);
};
