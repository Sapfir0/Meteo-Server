module.exports = function(sequelize, Sequelize) {
    var Profile = sequelize.define("profiles", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        oldWeatherDescriptionIcons: { 
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },


    });

    return Profile;
};
