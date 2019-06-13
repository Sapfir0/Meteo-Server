module.exports = function (sequelize, Sequelize) {
    var Meteostation = sequelize.define('meteostation', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        meteostationInside: { 
            type: Sequelize.INTEGER
        },
        meteostationOutside: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {
            associate: function(models) {
                Meteostation.hasMany(models.meteostationInside)
                Meteostation.hasMany(models.meteostationOutside)
            }
        }
    } 
    
    );

    

    return Meteostation;
};