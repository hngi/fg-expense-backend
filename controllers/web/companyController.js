/**
 * exports.method = req, res function
 *
 */
const Company = require('../../models/companies');
const apiresponse = require('../../utility/apiResponse');

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
      return apiresponse.ErrorResponse(res, 'Something went wrong');
    }
    return apiresponse.successResponseWithData(res, companies);
  });
};

exports.getCompany = (req, res, next) => {
  const companyId = req.params.id;
  const company = Company.find(companyId)
    .populate('Head')
    .populate('Project')
    .then((companyProfile) => {
      res.json(companyProfile);
    });
};
exports.getCompanies = (req, res, next) => {
  Company.find({})
    .then((companies) => {
      res.send(companies);
    })
    .catch(next);

};

exports.searchCompany = (req, res, next) => {
  const { q } = req.params;
  if (q && q.trim() !== "") {
    const reqexQ = new RegExp(q, "i");
    Company.find(
      { $or: [{ name: reqexQ }, { tweet_handle: reqexQ }] },
      "name",
      (err, d) => {
        if (d && err === null && d.status !== 3) {
          return apiResponse.successResponseWithData(res, "success", d);
        } else {
          return apiResponse.ErrorResponse(res, "Opps!");
        }
      }
    );
  }};
