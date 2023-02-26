const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");

const Op = db.Sequelize.Op;


  
exports.userBoard = (req, res) => {
  User.findOne({
    
    where: {
      id: jwt.decode(req.headers["x-access-token"]).id
    }
  })
  .then(user => {
    res.send(JSON.stringify(user, null, 2))
  });
};


  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };