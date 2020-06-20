const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

const Project = require("../models/Project");

/**
 * add routes and controller function directly under here:::
 * Please, ensure to label and order your controller properly so we can
 * have order here
 */

//All routes and controller on Projects
router.get("/projects/all", async (req, res, next) => {
  try {
    let allProjects = await Project.find()
      .populate("company", "_id", "name")
      .populate("mda", "_id", "name")
      .populate("Expense");

    return res.json(allProjects);
  } catch (err) {
    return next(err);
  }
});
// router.get('/project/:id', projectsController.singleProject);

/**
 * add routes and controller on Expense directly under here
 */

/**
 * add routes and payementReportController directly under here
 */

/**
 * add routes and sectorController directly under here
 */

/**
 * add routes and companyController directly under here
 */

/**
 * add routes and referenceController directly under here
 */

/**
 * add routes and mdaController directly under here
 */

/**
 * add routes and budgetController directly under here
 */

module.exports = router;
