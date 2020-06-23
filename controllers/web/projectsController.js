const Expense = require("../../models/expense");

const getAllProjects = (req, res, next) => 
{
/*try {
    let allProjects = await Project.find()
      .populate("company", "_id", "name")
      .populate("mda", "_id", "name")
      .populate("Expense");

    return res.json(allProjects);
*/
    Expenses.find({})
    .populate("mdas")
    .populate("companies")
    .then( function (expense)
    {
      return res.json(
        {
          status: "Success",
          message: "Data retrieved",
           data: {expense}
        }
    }.catch(next);

/*})
  } catch (err) {
    return next(err);
  }*/
};

module.exports = {
  getAllProjects,
};




