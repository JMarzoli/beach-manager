const { authJwt, verifyOwner } = require("../middleware");
const controller = require("../controllers/beach.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/beach",
    [authJwt.verifyToken],
    controller.readBeaches
  );
  app.get(
    "/api/beach/:beachId",
    [authJwt.verifyToken],
    controller.readBeach
  );
  app.post(
    "/api/beach",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addBeach
  );
  app.delete(
    "/api/beach/:beachId",
    [authJwt.verifyToken, authJwt.isAdmin, verifyOwner.checkBeachOwner],
    controller.deleteBeach
  );
};