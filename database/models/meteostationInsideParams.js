

module.exports = function (sequelize, Sequelize) {
    var MeteostationInside = sequelize.define("meteostationInside", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        temperatureH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
            validate: {
                isFloat: true
            }
        },
        humidityH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
            validate: {
                isFloat: true
            } 
        },
        sansityH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false, 
            defaultValue: 0 
        },
        sansityQualityH: { 
            type: Sequelize.STRING 
        }, 
        meteostationId: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 

        } 

    });

    

    return MeteostationInside;
};