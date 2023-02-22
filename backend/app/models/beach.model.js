module.exports = (sequelize, Sequelize) => {
    const Beach = sequelize.define("beaches", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Beach;
  };