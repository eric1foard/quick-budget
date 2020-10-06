const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // ============================================================================
  // POST request, for signing up a new user
  app.post(
    "/api/auth/signup",
    controller.signup
  );


  // ============================================================================
  // POST request, for logging in an existing user
  app.post(
    "/api/auth/signin", 
    controller.signin
  );

};
