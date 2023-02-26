const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyOwner = require("./verifyOwner");

module.exports = {
  authJwt,
  verifySignUp,
  verifyOwner
};