/**
 * export.method = req, res function
 *
 */

const Expenses = require("../../models/expense");
var ObjectId = require("mongoose").Types.ObjectId;
exports.getExpenses = (req, res, next) => {
  Expenses.find({ companies: ObjectId("5eec6cda730352ba558b1852") })
    .populate("mdas")
    .then((expenses) => {
      /* let data = {
        project: expenses.expenseDesc,
        projectAmt: expenses.expenseAmount,
        paymentDate: expenses.paymentDate,
        mda: expenses.mda,
        company: expenses.companies,
      }; */
      res.send(expenses);
    })
    .catch(next);
};

// const Project = require("../../models/Project");

// exports.getAllExpenses = async (req, res) => {
//   try {
//     const expenses = await Project.find({})
//       .populate('MDAs', '_id name')
//       .populate('Companies', '_id name');
//     const totalExpense = expenses.reduce((a, b) => {
//       return a + b.expenses;
//     }, 0);

//     return res
//       .status(200)
//       .json({
//         status: 'success',
//         message: 'Total and breakdown of all expenses',
//         data: { totalExpense, expenses },
//       });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ status: 'Failed', message: err.message, data: null });
//   }
// };
