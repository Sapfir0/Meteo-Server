module.exports = function (sequelize, Sequelize) {
    var Meteostation = sequelize.define("meteostation", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        meteostationInside: { 
            type: Sequelize.INTEGER
        },
        meteostationOutside: {
            type: Sequelize.INTEGER
        }
    } 
    );

    

    return Meteostation;
};