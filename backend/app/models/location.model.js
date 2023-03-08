/**
 * Defines a model for the locations of a beach 
 */
module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
      ombrella_number: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
  
    return Location;
  };