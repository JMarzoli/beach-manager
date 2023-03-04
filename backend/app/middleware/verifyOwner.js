const db = require("../models");
var jwt = require("jsonwebtoken");
const Beach = db.beach;
const Reservation = db.reservation;

checkBeachOwner = (req, res, next) => {
    if(!isNaN(req.params.beachId)){
        Beach.findOne({
            where: {
                id: req.params.beachId
            }
        })
        .then(beach => {
            if(beach.userId !== jwt.decode(req.headers["x-access-token"]).id){
                res.status(401).send({
                    message: "Failed! operation not permitted"
                });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
          });;
    }

};

checkReservationOwner = (req, res, next) => {
    if(!isNaN(req.params.reservationId)){
        Reservation.findOne({
            where: {
                id: req.params.reservationId
            }
        })
        .then(reservation => {
            if(reservation.userId !== jwt.decode(req.headers["x-access-token"]).id){
                res.status(401).send({
                    message: "Failed! operation not permitted"
                });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
          });;
    }

};

const verifyOwner = {
    checkBeachOwner: checkBeachOwner,
    checkReservationOwner: checkReservationOwner
  };

module.exports = verifyOwner;