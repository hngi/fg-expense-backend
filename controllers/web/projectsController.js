const Project = require("../../models/Project");	
const companies = require("../../models/companies");

const createProject = async (req, res) => {
    const { name, MDAs, companies, expenses } = req.body;
    let project = new Project ({ name, MDAs, companies, expenses });
    await Project.save;

    //reponse message
  res.status(200)
    .send({ 
        status: true,
        message: 'Company created successfully'
    });
}

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
  createProject
};