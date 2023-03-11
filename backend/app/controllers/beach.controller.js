const db = require("../models");
const {validator, validateBody} = require('../helper/validate');
var jwt = require("jsonwebtoken");
const Beach = db.beach;

const Op = db.Sequelize.Op;

/**
 * Provides all the beaches in the db 
 */
exports.readBeaches = (req, res) => {
    Beach.findAll()
    .then(beaches => {
            const responseJson = {
                elements:beaches
            }
            res.send(JSON.stringify(responseJson, null, 2))
        }
    )
    .catch(err => {
        res.status(500).send({ message: err.message });
      });;
};

/**
 * Creates a new beach and stores into the db 
 */
exports.addBeach = async (req, res) => {
    const validationRule = {
        "name": "required|string"
    };
    await validateBody(req.body, res, validationRule,() => {
        Beach.create({
            name: req.body.name,
            userId: jwt.decode(req.headers["x-access-token"]).id, // extract the id of the user who wants to add the beach 
        })
        .then(beach => {
            res.send({ message: "Beach created successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }) 
};

/**
 * Provides the info of a beach by the given id 
 */
exports.readBeach = async (req, res) => {
    const validationRule = {
        "beachId": "required|integer"
    };
    await validateBody(req.params, res, validationRule,() => {
        Beach.findOne({
            where: {
                id: req.params.beachId
            }
        })
        .then(beach => {
            res.send(JSON.stringify(beach, null, 2))
        });
    })
    
};

/**
 * Delete a beach from the db, by the given id
 */
exports.deleteBeach = async (req, res) => {
    const validationRule = {
        "beachId": "required|integer"
    };
    await validateBody(req.params, res, validationRule,() => {
        Beach.destroy({
            where: {
                id: req.params.beachId
            }
        })
        .then(beach => {
            res.send({ message: "Beach deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    })

};
