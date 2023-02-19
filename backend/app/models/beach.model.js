module.exports = (sequelize, Sequelize) => {
    const Beach = sequelize.define("beaches", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  
    return Beach;
  };