var express = require('express');
var router = express.Router();
//require all web controllers
var projectsController = require('../controllers/web/projectsController');
var paymentReportController = require('../controllers/web/paymentReportController');
var referenceController = require('../controllers/web/referenceController');
var mdaController = require('../controllers/web/mdaController');
var companyController = require('../controllers/web/companyController');
var expenseController = require('../controllers/web/expenseController');
var budgetController = require('../controllers/web/budgetController');
var sectorController = require('../controllers/web/sectorController');

//demo data
var userController = require('../controllers/userController');

// demo route
// router.post("/users", userController.newUser);

/**
 * add routes for projects controller directly under here
 */
router.get('/project/all', projectsController.getAllProjects);
router.get('/project/:id', projectsController.singleProject);

/**
 * add routes for expenseController directly under here
 */
router.get('/expense/all', expenseController.getAllExpenses);
router.get('/expense/:id', expenseController.getSingleExpense);

/**
 * add routes for payementReportController directly under here
 */
router.get('/report/all', paymentReportController.getAllReports);
router.get('/report/:id', paymentReportController.getReport);
router.get('/report/download', paymentReportController.downloadReport);

// Get posts index/posts
router.get('/',  userController.index);
//router.get('/users', userController.index);

//POST - Create new user
router.post('/user',  userController.createUser);


/**
 * add routes for sectorController directly under here
 */
router.get('/sector/all', sectorController.getASector);
router.get('/sector/:id', sectorController.getAllSectors);

/**
 * add routes for companyController directly under here
 */
router.get('/company/all', companyController.getAllCompanies);
router.get('/company/:id', companyController.getAcompany);

/**
 * add routes for referenceController directly under here
 */
router.get('/refrence/all', referenceController.getAllRefrences);
router.get('/refrence/search', referenceController.getParticularRefrence);

/**
 * add routes for mdaController directly under here
 */
router.get('/mda/all', mdaController.getAllMdas);
router.get('/mda/:id', mdaController.getSingleMda);

/**
 * add routes for budgetController directly under here
 */
router.get('/budget/search', budgetController.searchBudget);
router.get('/budget/all', budgetController.getAllBudgets);

module.exports = router;
