module.exports = function(sequelize, Sequelize) {
    var Arduino = sequelize.define('arduino', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        temperatureInHome: { type: Sequelize.DOUBLE, allowNull: false },
        humidityInHome: { type: Sequelize.DOUBLE, allowNull: false },
        temperature: { type: Sequelize.DOUBLE, allowNull: false },
        humidity: { type: Sequelize.DOUBLE, allowNull: false },
        pressure: { type: Sequelize.DOUBLE, allowNull: false },
        arduinoTimestamp: { type: Sequelize.DATE },
        
        rusWeatherDescription: { type: Sequelize.STRING  },
        engWeatherDescription: { type: Sequelize.STRING },
        sansity: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
        sansityQuality: { type: Sequelize.INTEGER }, //
        weatherId: { type: Sequelize.INTEGER, allowNull: false },
        windSpeed: { type: Sequelize.INTEGER, allowNull: false  },
        windDeg: { type: Sequelize.INTEGER, allowNull: false  },
        icon: { type: Sequelize.STRING, allowNull: false}

    });

    return Arduino;
};
