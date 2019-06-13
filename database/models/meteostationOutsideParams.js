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
            unique: true,
            references: {
                model: 'meteostation',
                key: 'id'
            }
        } //если 0, то это постман(хотя щас я сделал небесопасно)

    });

    //MeteostationOutside.belongsTo(MeteostationInside)
    return MeteostationOutside;
};