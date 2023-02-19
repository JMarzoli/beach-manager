module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
      date_start: {
        type: Sequelize.DATE
      },
      date_end: {
        type: Sequelize.DATE
      }
    });
  
    return Reservation;
  };