const { authJwt, verifyOwner } = require("../middleware");
const controller = require("../controllers/location.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/beach/:beachId/locations",
    [authJwt.verifyToken],
    controller.readLocations
  );
  app.get(
    "/api/beach/:beachId/locations/:locationId",
    [authJwt.verifyToken],
    controller.readLocation
  );
  app.post(
    "/api/beach/:beachId/locations",
    [authJwt.verifyToken, verifyOwner.checkBeachOwner],
    controller.addLocation
  );
  app.delete(
    "/api/beach/:beachId/locations/:locationId",
    [authJwt.verifyToken, verifyOwner.checkBeachOwner],
    controller.deleteLocation
  );
};