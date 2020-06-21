/**
 * export.method = req, res function
 *
 */

const Expenses = require("../../models/expense");
// const Project = require("../../models/project");

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
      res.status(200).json({
        status: "success",
        message: "All expenses retrieved",
        data: { expenses },
      });
    })
    .catch(next);
};

// exports.getAllExpenseAmount = async (req, res) => {
//   try {
//     const expenses = await Project.find({})
//       .populate("MDAs", "_id name")
//       .populate("Companies", "_id name");
//     const totalExpense = expenses.reduce((a, b) => {
//       return a + b.expenses;
//     }, 0);

//     return res.status(200).json({
//       status: "success",
//       message: "Total and breakdown of all expenses",
//       data: { totalExpense, expenses },
//     });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ status: "Failed", message: err.message, data: null });
//   }
// };

exports.getCompanyFunds = (req, res, next) => {
  Expenses.find({})
    .populate("mdas")
    .populate("companies")
    .then((expenses) => {
      let expense = {},
        result = [];
      expenses.forEach((exp) => {
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
        message: "All Companies and Funds Received",
        data: result,
      });
    })
    .catch(next);
};

/*
 *Returns Total monthly expenses by all MDAs
 */
exports.getTotalMonthlyExpenses = async (req, res) => {
  try {
    await Expenses.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$paymentDate" },
            year: { $year: "$paymentDate" },
          },
          total: { $sum: "$expenseAmount" },
        },
      },
    ]).exec((err, result) => {
      if (err) throw err;
      let data = [];
      for (let i = 0; i <= result.length - 1; i++) {
        data.push({
          total: result[i].total,
          month: result[i]._id.month,
          year: result[i]._id.year,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Total Monthly Expenses by of all MDAs",
        data,
        // result, - decided not to pass result, since it may be difficult for frontend to handle
      });
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Failed", message: err.message, data: null });
  }
};

exports.getExpensesByYearAndMonth = async (req, res) => {
  try {
    // FInd by Year and Month
    let year = req.params.year;
    let month = req.params.month;
    const expenses = await Expenses.find({
      paymentDate: {
        $lt: Date(`${year}-${month}`),
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Total and breakdown of all expenses",
      data: { expenses },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Failed", message: err.message, data: null });
  }
};

exports.getSingleExpense = async (req, res) => {
  try {
    const expense = await Expenses.findById(req.params.id).populate(
      "mdas companies"
    );
    if (!expense)
      return res.status(404).json({
        status: "failed",
        message: "Expense not found",
        data: null,
      });

    res.status(200).json({
      status: "success",
      message: "Expense Details",
      data: { expense },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: null,
    });
  }
};
