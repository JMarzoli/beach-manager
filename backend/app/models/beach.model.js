/**
 * Defines a model for the beaches 
 */
module.exports = (sequelize, Sequelize) => {
    const Beach = sequelize.define("beaches", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Beach;
  };