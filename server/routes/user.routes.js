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

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/user/income",
    [authJwt.verifyToken],
    controller.userIncome
  );

  app.get(
    "/api/test/user/expense",
    [authJwt.verifyToken],
    controller.userExpense
  );

  app.put(
    "/api/test/user/save/income",
    [authJwt.verifyToken],
    controller.saveIncome
  );

  app.put(
    "/api/test/user/save/expense",
    [authJwt.verifyToken],
    controller.saveExpense
  );

}