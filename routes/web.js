var express = require("express");
var router = express.Router();
//require all web controllers
var projectsController = require("../controllers/web/projectsController");
var paymentReportController = require("../controllers/web/paymentReportController");
var referenceController = require("../controllers/web/referenceController");
var mdaController = require("../controllers/web/mdaController");
var companyController = require("../controllers/web/companyController");
var expenseController = require("../controllers/web/expenseController");
var budgetController = require("../controllers/web/budgetController");
var sectorController = require("../controllers/web/sectorController");

//demo data
var userController = require("../controllers/userController");

const SubscriberController = require("../controllers/SubscriberController");



// demo route
// router.post("/users", userController.newUser);

/**
 * add routes for projects controller directly under here
 */

/**
 * add routes for expenseController directly under here
 */

/**
 * add routes for payementReportController directly under here
 */

// Get posts index/posts
router.get('/',  userController.index);

//router.get('/users', userController.index);

//POST - Create new user
router.post("/user", userController.createUser);


router
  .route("/subscribers")
  .get(SubscriberController.getAllSubscribers())
  .post(
    SubscriberController.subscribeRouteValidation(),
    SubscriberController.subscribe()
  )
  .delete(
    SubscriberController.subscribeRouteValidation(),
    SubscriberController.unSubscribe()
  );
router.post("/subscribers/mail", SubscriberController.mailSubscribers());


/**
 * add routes for sectorController directly under here
 */

/**
 * add routes for companyController directly under here
 */

router.get("/companies/", companyController.getAllcompany);

/**
 * add routes for referenceController directly under here
 */

/**
 * add routes for mdaController directly under here
 */

/**
 * add routes for budgetController directly under here
 */


module.exports = router;
