const db = require("../models");
var jwt = require("jsonwebtoken");
const Beach = db.beach;
const Reservation = db.reservation;

/**
 * Checks if a userId is the owner of a specific beach, in negative case a 401 is returned in response 
 */
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
    }else{
        res.status(401).send({
            message: "Failed! operation not permitted"
        });
        return;
    }
    
    
};

/**
 * Checks if a specific reservations wase made by a specific user, in negative case a 401 status will be send in response 
 */
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
    }else{
        res.status(401).send({
            message: "Failed! operation not permitted"
        });
        return;
    }

};

const verifyOwner = {
    checkBeachOwner: checkBeachOwner,
    checkReservationOwner: checkReservationOwner
  };

module.exports = verifyOwner;