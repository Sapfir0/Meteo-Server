
module.exports = function(sequelize, Sequelize) {
    var MeteostationOutside = sequelize.define('meteostationOutside', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        temperature: { 
            type: Sequelize.DOUBLE, 
            allowNull: false 
        },
        humidity: { 
            type: Sequelize.DOUBLE, 
            allowNull: false 
        },
        pressure: { 
            type: Sequelize.DOUBLE, 
            allowNull: false 
        },
        engWeatherDescription: { 
            type: Sequelize.STRING 
        },
        weatherId: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        windSpeed: { 
            type: Sequelize.INTEGER 
        },
        windDeg: { 
            type: Sequelize.INTEGER  
        },
        icon: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        meteostationId: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            // references: {
            //     model: meteostation,
            //     key: 'id'
            // }
        } 

    });

    //MeteostationOutside.belongsTo(MeteostationInside)
    return MeteostationOutside;
};