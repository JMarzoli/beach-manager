const db = require("../models");
var jwt = require("jsonwebtoken");
const Reservation = db.reservation;

const Op = db.Sequelize.Op;

exports.readReservations = (req, res) => {
    Reservation.findAll(
        {
            where: {
                userId: jwt.decode(req.headers["x-access-token"]).id
            }
        }
    )
    .then(reservations => {
            const responseJson = {
                elements:reservations
            }
            res.send(JSON.stringify(responseJson, null, 2))
        }
    );
};

exports.addReservation = (req, res) => {
    Reservation.create({
        locationId: req.body.locationId,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        userId: jwt.decode(req.headers["x-access-token"]).id,
      })
        .then(reservation => {
            res.send({ message: "Reservation created successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.readReservation = (req, res) => {
    Reservation.findOne({
            where: {
                id: req.params.reservationId,
                userId: jwt.decode(req.headers["x-access-token"]).id
            }
        }
    )
    .then(reservation => {
            res.send(JSON.stringify(reservation, null, 2))
        }
    );
};

exports.deleteReservation = (req, res) => {
    Reservation.destroy({
            where: {
                id: req.params.reservationId,
                userId: jwt.decode(req.headers["x-access-token"]).id
            }
        }
    )
    .then(reservation => {
        res.send({ message: "Reservation deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};