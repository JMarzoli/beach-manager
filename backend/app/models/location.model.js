module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      ombrella_number: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
  
    return Location;
  };