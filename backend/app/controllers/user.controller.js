const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");

const Op = db.Sequelize.Op;

/**
 * Provides the infos of a user, by is id 
 */
exports.userBoard = (req, res) => {
  User.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: jwt.decode(req.headers["x-access-token"]).id
    }
  })
  .then(user => {
    res.send(JSON.stringify(user, null, 2))
  });
};