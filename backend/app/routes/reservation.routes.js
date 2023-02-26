const { authJwt, verifyOwner } = require("../middleware");
const controller = require("../controllers/reservation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/reservation",
    [authJwt.verifyToken],
    controller.readReservations
  );
  app.get(
    "/api/reservation/:reservationId",
    [authJwt.verifyToken],
    controller.readReservation
  );
  app.post(
    "/api/reservation",
    [authJwt.verifyToken],
    controller.addReservation
  );
  app.delete(
    "/api/reservation/:reservationId",
    [authJwt.verifyToken, verifyOwner.checkReservationOwner],
    controller.deleteReservation
  );
};