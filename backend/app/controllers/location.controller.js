const db = require("../models");
const {validator, validateBody} = require('../helper/validate');
const Location = db.location;

const Op = db.Sequelize.Op;

/**
 * Provides all the location associated to a given beach 
 */
exports.readLocations = async (req, res) => {
    const validationRule = {
        "beachId": "required|integer"
    };
    await validateBody(req.params, res, validationRule,() => {
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
    }) 
    
};

/**
 * Creates a new location associated to a beach and adds it to the db
 */
exports.addLocation = async (req, res) => {

    const validationRule = {
        "ombrella_number": "required|integer",
        "price": "required|integer"
    };

    await validateBody(req.body, res, validationRule,() => {
        Location.create({
            ombrella_number: req.body.ombrella_number,
            beachId: req.params.beachId,
            price: req.body.price
          })
        .then(location => {
            res.send({ message: "Location created successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    });
};

/**
 * Provides the infos of a location by the beachid and locationid
 */
exports.readLocation = async (req, res) => {
    const validationRule = {
        "beachId": "required|integer",
        "locationId": "required|integer"
    };

    await validateBody(req.params, res, validationRule,() => {
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
    });
    
};

/**
 * Delete a location of a beach ,by the beachid and the locationId, from the db 
 */
exports.deleteLocation = async (req, res) => {
    const validationRule = {
        "locationId": "required|integer"
    };

    await validateBody(req.params, res, validationRule,() => {
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
    });
    
};
