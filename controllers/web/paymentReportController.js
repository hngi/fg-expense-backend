const unirest = require("unirest");
const apiresponse = require("../../utility/apiResponse");
const Payment = require("../../models/payment_report");
// const { insertMany } = require("../../models/MDA");
const APIKEY = ""; // Spreadsheets micro service


exports.createPaymentReport = async (req, res) => {
  const { minister, project, companies, company_chairman, amount } = req.body;
  let payment_report = new payment_report({ minister, project, companies, company_chairman, amount });
   payment_report.save();

      //reponse message
  res.status(200)
  .send({ 
    status: true,
    message: 'Expenses created successfully'
  });
}


exports.sortReport = async function (req, res) {
  // seting enum values for mothes

  const monthEnum = {
    january: 1,
    feburary: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  Object.freeze(monthEnum);

  // make request to micro service

  unirest
    .get(APIKEY)
    .then(() => {
      const fkey = req.params.fkey;
      const skey = req.params.skey;
      //dum data for testing
      var unordered = [
        {
          month: "january",
          yaer: "2019",
          amount: "100",
        },
        {
          month: "january",
          yaer: "2019",
          amount: "500",
        },
        {
          month: "january",
          yaer: "2019",
          amount: "188",
        },
        {
          month: "january",
          yaer: "30",
          amount: "100",
        },
        {
          month: "january",
          yaer: "2020",
          amount: "100",
        },
        {
          month: "april",
          yaer: "2020",
          amount: "25",
        },
        {
          month: "april",
          yaer: "2020",
          amount: "66",
        },
        {
          month: "april",
          yaer: "2020",
          amount: "100",
        },
        {
          month: "april",
          yaer: "2019",
          amount: "5",
        },
        {
          month: "april",
          yaer: "2018",
          amount: "18",
        },
        {
          month: "april",
          yaer: "2020",
          amount: "150",
        },
        {
          month: "january",
          yaer: "2019",
          amount: "30000",
        },
        {
          month: "january",
          yaer: "2018",
          amount: "1500",
        },
        {
          month: "april",
          yaer: "2019",
          amount: "100",
        },
      ];

      if (fkey == undefined && skey == undefined) {
        unordered.sort((a, b) =>
          Number(a.amount) < Number(b.amount) ? 1 : -1
        );
        res.status(200).json(unordered);
      } else if (monthEnum[fkey.toLowerCase()]) {
        var skeyn = Number(skey);
        if (skeyn >= 2018 && skeyn <= 2020) {
          // var unordered=response.body.data

          var farray = unordered.filter((item) => {
            return item.month == fkey.toLowerCase() && item.yaer == skeyn;
          });

          farray.sort((a, b) => (Number(a.amount) < Number(b.amount) ? 1 : -1));

          if (farray.length == 0) {
            res.json({
              msg: "sorry but we dont have data on that day",
            });
          }

          res.json(farray);
        } else {
          res.status(400).json({
            msg: "year must be bettwen 2018 and 2020",
          });
        }
      } else if (Number(fkey) >= 2018 && Number(fkey) <= 2020) {
        farray = unordered.filter((item) => {
          return item.yaer == fkey;
        });
        farray.sort((a, b) => (Number(a.amount) < Number(b.amount) ? 1 : -1));
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
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

// Get All Payment Reports
exports.getAllReports = async (req, res) => {
  const reports = await Payment.find();
  reports.exec((err, payments) => {
    if (err) {
      return apiresponse.ErrorResponse(res, "Something went wrong");
    }
    return apiresponse.successResponseWithData(res, payments);
  });
};