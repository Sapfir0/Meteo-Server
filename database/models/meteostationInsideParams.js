const meteostation = require("./meteostation")


module.exports = function (sequelize, Sequelize) {
    var MeteostationInside = sequelize.define('meteostationInside', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        temperature: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
        },
        humidity: { 
            type: Sequelize.DOUBLE, 
            allowNull: false 
        },
        sansity: { 
            type: Sequelize.DOUBLE, 
            allowNull: false, 
            defaultValue: 0 
        },
        sansityQuality: { 
            type: Sequelize.STRING 
        }, //
        meteostationId: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            unique: true,
            references: {
                model: meteostation,
                key: 'id'
            }
        } 

    });

    

    return MeteostationInside;
};