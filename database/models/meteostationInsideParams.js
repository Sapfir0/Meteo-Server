

module.exports = function (sequelize, Sequelize) {
    var MeteostationInside = sequelize.define('meteostationInside', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        temperatureH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
        },
        humidityH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false 
        },
        sansityH: { 
            type: Sequelize.DOUBLE, 
            allowNull: false, 
            defaultValue: 0 
        },
        sansityQualityH: { 
            type: Sequelize.STRING 
        }, //
        meteostationId: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            unique: true,
            // references: {
            //     model: meteostation,
            //     key: 'id'
            // }
        } 

    });

    

    return MeteostationInside;
};