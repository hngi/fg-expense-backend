const Project = require("../../models/Project");

const getAllProjects = async (req, res, next) => {
  try {
    let allProjects = await Project.find()
      .populate("company", "_id", "name")
      .populate("mda", "_id", "name")
      .populate("Expense");

    return res.json(allProjects);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllProjects,
};
