const db = require("../models");
const User = db.beach;

const Op = db.Sequelize.Op;

exports.readBeaches = (req, res) => {
  res.send("Elenco")
};

