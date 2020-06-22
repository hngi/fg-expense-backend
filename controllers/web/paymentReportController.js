const apiresponse = require("../../utility/apiResponse");
const Payment = require("../../models/payment_report");
const Expense = require("../../models/expense");
// const { insertMany } = require("../../models/MDA");

exports.createPaymentReport = async (req, res) => {
  const { minister, project, companies, company_chairman, amount } = req.body;
  let payment_report = new payment_report({
    minister,
    project,
    companies,
    company_chairman,
    amount,
  });
  payment_report.save();

  //reponse message
  res.status(200).send({
    status: true,
    message: "Expenses created successfully",
  });
};

exports.sortReport = async function (req, res) {
  // seting enum values for mothes

  const monthEnum = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  Object.freeze(monthEnum);

  // make request to micro service
  //const report=await Expense.find()
  //console.log(report)
  //  res.json(report)
  // var date = new Date("2020-03-11T05:00:00.000Z");
  // console.log(monthEnum[date.getMonth()]);
  var fkey = req.params.fkey;
  var skey = req.params.skey;
  //dum data for testing
  var unordered = await Expense.find().populate("mdas companies");

  if (fkey == undefined && skey == undefined) {
    unordered.sort((a, b) =>
      Number(a.expenseAmount) < Number(b.expenseAmount) ? 1 : -1
    );
    res.status(200).json(unordered);
  } else if (monthEnum[Number(fkey)]) {
    // var unordered=response.body.data
    if (skey == undefined) {
      skey = new Date().getFullYear();
    }
    var farray = unordered.filter((item) => {
      // console.log(new Date(item.paymentDate).getMonth() + 1, fkey);
      // console.log(new Date(item.paymentDate).getFullYear());

      return (
        new Date(item.paymentDate).getMonth() + 1 == fkey &&
        new Date(item.paymentDate).getFullYear() == skey
      );
    });

    farray.sort((a, b) =>
      Number(a.expenseAmount) < Number(b.expenseAmount) ? 1 : -1
    );

    if (farray.length == 0) {
      res.json({
        msg: "sorry but we dont have data on that day",
      });
    }

    res.json(farray);
  } else if (Number(fkey)) {
    farray = unordered.filter((item) => {
      return new Date(item.paymentDate).getFullYear() == fkey;
    });
    farray.sort((a, b) =>
      Number(a.expenseAmount) < Number(b.expenseAmount) ? 1 : -1
    );
    if (farray.length == 0) {
      res.json({
        msg: "sorry but we dont have data on that date",
      });
    }

    res.json(farray);
  } else {
    res.status(400).json({
      msg: "invalid year or month",
    });
  }
};

// Get All Payment Reports
exports.getAllReports = (req, res) => {
  const reports = Payment.find();
  reports.exec((err, payments) => {
    if (err) {
      return apiresponse.ErrorResponse(res, "Something went wrong");
    }
    return apiresponse.successResponseWithData(res,"All Reports", payments);
  });
};
