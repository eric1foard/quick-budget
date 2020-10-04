const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // ============================================================================
  // GET requests, returning user income/expense information
  app.get(
    "/api/user/income",
    [authJwt.verifyToken],
    controller.userIncome
  );

  app.get(
    "/api/user/expense",
    [authJwt.verifyToken],
    controller.userExpense
  );


  // ============================================================================
  // POST requests, for saving a new user's income/expense information
  app.post(
    "/api/user/save/income/new",
    [authJwt.verifyToken],
    controller.saveIncomeNew
  );

  app.post(
    "/api/user/save/expense/new",
    [authJwt.verifyToken],
    controller.saveExpenseNew
  );


  // ============================================================================
  // PUT requests, for updating an existing user's income/expense information
  app.put(
    "/api/user/save/income",
    [authJwt.verifyToken],
    controller.saveIncome
  );

  app.put(
    "/api/user/save/expense",
    [authJwt.verifyToken],
    controller.saveExpense
  );

}