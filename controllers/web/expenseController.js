/**
 * export.method = req, res function
 *
 */

const Expenses = require("../../models/expense");
const ProjectModel = require("../../models/project");

exports.createExpenses = async (req, res) => {
  const { mdas, companies, expenseAmount, expenseDesc, paymentDate } = req.body;
  let expenses = new Expenses({
    mdas,
    companies,
    expenseAmount,
    expenseDesc,
    paymentDate,
  });
  await expenses.save();

  //reponse message
  res.status(200).send({
    status: true,
    message: "Expenses created successfully",
  });
};

exports.getExpenses = (req, res, next) => {
  Expenses.find({})
    .populate("mdas")
    .populate("companies")
    .then((expenses) => {
      //   let expense = {
      //     project= expenses.expenseDesc,
      //     projectAmt=expenses.expenseAmount,
      //     paymentDate= expenses.paymentDate,
      //     mda; expenses.mda,
      //     company: expenses.companies,
      //   };
      res.status(200).json({
        status: "success",
        message: "All expenses retrieved",
        data: { expenses },
      });
    })
    .catch(next);
};

exports.getAllExpenseAmount = async (req, res) => {
  try {
    const expenses = await ProjectModel.find({})
      .populate("MDAs", "_id name")
      .populate("Companies", "_id name");
    const totalExpense = expenses.reduce((a, b) => {
      return a + b.expenses;
    }, 0);

    return res.status(200).json({
      status: "success",
      message: "Total and breakdown of all expenses",
      data: { totalExpense, expenses },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Failed", message: err.message, data: null });
  }
};

exports.getCompanyFunds = (req, res, next) => {
  Expenses.find({})
    .populate("mdas")
    .populate("companies")
    .then((expenses) => {
      let expense = {};
      let result = [];
      expenses.forEach((exp) => {
        console.log(exp);
        expense.mda = exp.mdas.name;
        expense.mdaHandle = exp.mdas.twitter_handle;
        expense.companyName = exp.companies.name;
        expense.companyHandle = exp.companies.twitter_handle;
        expense.companyHead = exp.companies.head;
        expense.companyHeadHandle = exp.companies.head_handle;
        expense.project = exp.expenseDesc;
        expense.projectAm = exp.expenseAmount;
        expense.paymentDate = exp.paymentDate;
        result.push(expense);
      });
      res.status(200).json({
        status: "success",
        message: "All Companyies and Funds Received",
        data: { result },
      });
    })
    .catch(next);
};
