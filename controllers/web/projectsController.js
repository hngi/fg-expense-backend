const Project = require("../../models/Project");
const Expense = require("../../models/expense");
const apiresponse = require("../../utility/apiResponse");

const createProject = async (req, res) => {
  const { name, MDAs, companies, expenses } = req.body;
  let project = new Project({ name, MDAs, companies, expenses });
  await project.save();

  //reponse message
  res.status(200).send({
    status: true,
    message: "Company created successfully",
  });
};

const getAllProjects = async (req, res, next) => {
  try {
    let allProjects = await Expense.find()
      .populate("companies", "_id name")
      .populate("mdas", "_id name");

    let result = allProjects.map((project) => ({
      projectId: project._id,
      project: project.expenseDesc,
      projectAmount: project.expenseAmount,
      paymentDate: project.paymentDate,
      mdaId: project.mdas._id,
      mda: project.mdas.name,
      companyId: project.companies._id,
      company: project.companies.name,
    }));
    return apiresponse.successResponseWithData(res, "All projects", result);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllProjects,
  createProject,
};
