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
const SubscriberController = require('../controllers/SubscriberController');

//demo data
var userController = require('../controllers/userController');

//demo route
router.post('/users', userController.createUser);

/**
 * add routes for projects controller directly under here
 */
router.get('/projects/all', projectsController.getAllProjects);
//router.get("/projects/:id", projectsController.singleProject);

/**
 * add routes for expenseController directly under here
 */
router.get('/expenses/all', expenseController.getExpenses);
//router.get("/expense/:id", expenseController.getSingleExpense);

/**
 * add routes for payementReportController directly under here
 */
router.get('/report/all', paymentReportController.getAllReports);
//router.get("/report/:id", paymentReportController.getReport);
//router.get("/report/download", paymentReportController.downloadReport);
router.get('/companies', companyController.getCompanies);
router.get('/sortreport/:fkey?/:skey?', paymentReportController.sortReport);

// Get posts index/posts
//router.get("/", userController.index);
//router.get('/users', userController.index);

//POST - Create new user
//router.post("/user", userController.createUser);

/**
 * Routes for newsletter service
 */
router
  .route('/subscribers')
  .get(SubscriberController.getAllSubscribers())
  .post(
    SubscriberController.subscribeRouteValidation(),
    SubscriberController.subscribe()
  )
  .delete(
    SubscriberController.subscribeRouteValidation(),
    SubscriberController.unSubscribe()
  );
router.post('/subscribers/mail', SubscriberController.mailSubscribers());

// Get posts index/posts
router.get('/', userController.index);
//router.get('/users', userController.index);

//POST - Create new user
router.post('/users', userController.createUser);

/**
 * add routes for sectorController directly under here
 */
//router.get("/sectors/all", sectorController.getAllSectors);
router.get('/sectors/:id', sectorController.getASector);

/**
 * add routes for companyController directly under here
 */
router.get('/company/all', companyController.getAllcompany);

// search for company
router.post('/company/search/:q', companyController.searchCompany);

//router.get("/company/:id", companyController.getAcompany);

/**
 * add routes for referenceController directly under here
 */
//router.get("/refrences/all", referenceController.getAllRefrences);
//router.get("/refrences/search", referenceController.getParticularRefrence);

/**
 * add routes for mdaController directly under here
 */

//router.get("/mdas/all", mdaController.getAllMdas);
//router.get("/mdas/:id", mdaController.getSingleMda);

/**
 * add routes for expensesController directly under here
 */

router.get('/expenses/all', expenseController.getExpenses);

module.exports = router;
