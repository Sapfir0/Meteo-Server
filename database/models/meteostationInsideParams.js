module.exports = function(sequelize, Sequelize) {
    var MeteostationInside = sequelize.define('meteostationInside', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        temperature: { type: Sequelize.DOUBLE, allowNull: false },
        humidity: { type: Sequelize.DOUBLE, allowNull: false },
        sansity: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
        sansityQuality: { type: Sequelize.INTEGER }, //
        meteostationId: { type: Sequelize.INTEGER, allowNull: false, unique: true } //если 0, то это постман(хотя щас я сделал небесопасно)

    });

    return MeteostationInside;
};