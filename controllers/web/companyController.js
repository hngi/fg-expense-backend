/**
 * exports.method = req, res function
 *
 */
const Company = require("../../models/company");
const apiresponse = require("../../utility/apiResponse");

exports.getAllcompany = (req, res) => {
  const allCompanyQuery = Company.find({}).select({
    name: 1,
    _id: 0,
    tweet_handle: 1,
    Projects: 1,
    expenses: 1,
    DOC: 1,
  });

  allCompanyQuery.exec((err, companies) => {
    if (err) {
      return apiresponse.ErrorResponse(res, "Something went wrong");
    }
    return apiresponse.successResponseWithData(res, companies);
  });
};

exports.searchCompany = (req, res) => {
  const { q } = req.params;
  if (q && q.trim() !== "") {
    const reqexQ = new RegExp(q, "i");
    Company.find(
      { $or: [{ name: reqexQ }, { tweet_handle: reqexQ }] },
      "name",
      (err, d) => {
        if (d && err === null && d.status !== 3) {
          return apiresponse.successResponseWithData(res, "success", d);
        } else {
          return apiresponse.ErrorResponse(res, "Opps!");
        }
      }
    );
  }
};
