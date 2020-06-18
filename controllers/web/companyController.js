/**
 * exports.method = req, res function
 *
 */
const Company = require("../../models/company");
const apiresponse = require("../../utility/apiResponse");

exports.getAllcompany = (req, res, next) => {
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
