module.exports = function(sequelize, Sequelize) {
    var Arduino = sequelize.define('arduino', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        temperatureInHome: { type: Sequelize.DOUBLE, allowNull: false },
        humidityInHome: { type: Sequelize.DOUBLE, allowNull: false },
        temperature: { type: Sequelize.DOUBLE, allowNull: false },
        humidity: { type: Sequelize.DOUBLE, allowNull: false },
        pressure: { type: Sequelize.DOUBLE, allowNull: false },
        weatherDescription: { type: Sequelize.STRING, allowNull: false },
        arduinoTimestamp: { type: Sequelize.DATE }
    });

    return Arduino;
};
