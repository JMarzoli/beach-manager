const db = require("../models");
const Location = db.location;

const Op = db.Sequelize.Op;

exports.readLocations = (req, res) => {
    Location.findAll(
        {
            where: {
                beachId: req.params.beachId
            }
        }
    )
    .then(locations => {
            const responseJson = {
                elements:locations
            }
            res.send(JSON.stringify(responseJson, null, 2))
        }
    );
};

exports.addLocation = (req, res) => {
    Location.create({
        ombrella_number: req.body.ombrella_number,
        beachId: req.params.beachId,
        price: req.body.price,
      })
        .then(location => {
            res.send({ message: "Location created successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.readLocation = (req, res) => {
    Location.findOne({
        where: {
                [Op.and]: [
                    { beachId: req.params.beachId },
                    { id: req.params.locationId }
                ]
        }
    })
    .then(location => {
            res.send(JSON.stringify(location, null, 2))
        }
    );
};

exports.deleteLocation = (req, res) => {
    Location.destroy({
        where: {
            id: req.params.locationId
        }
    })
    .then(location => {
        res.send({ message: "Location deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
