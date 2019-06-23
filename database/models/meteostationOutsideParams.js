
module.exports = function(sequelize, Sequelize) {
    var MeteostationOutside = sequelize.define("meteostationOutside", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER
        },
        temperature: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
            validate: {
                isFloat: true
            } 
        },
        humidity: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
            validate: {
                isFloat: true
            }
        },
        pressure: { 
            type: Sequelize.DOUBLE, 
            allowNull: false,
            validate: {
                isFloat: true
            },
            // max: 815.85,
            // min: 641.3

        },
        engWeatherDescription: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        weatherId: { 
            type: Sequelize.INTEGER, 
            allowNull: false,
            validate: {
                isInt: true
            },
            max: 804,
            min: 200 
        },
        windSpeed: { 
            type: Sequelize.INTEGER 
        },
        windDeg: { 
            type: Sequelize.INTEGER  
        },
        sunriseTime: {
            type: Sequelize.BIGINT  
        },
        sunsetTime: {
            type: Sequelize.BIGINT
        },
        icon: { 
            type: Sequelize.STRING, 
            allowNull: false,
            is: ["^[0-9][0-9](n|d)$", 'i']
        },
        meteostationId: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 

        } 

    });

    //MeteostationOutside.belongsTo(MeteostationInside)
    return MeteostationOutside;
};