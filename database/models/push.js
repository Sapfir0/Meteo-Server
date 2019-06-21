module.exports = function(sequelize, Sequelize) {
    var PushSchema = sequelize.define('pushSchemas', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        endpoint: { 
            type: Sequelize.STRING,
        },
        p256dh: {
            type: Sequelize.STRING
        },
        auth: {
            type: Sequelize.STRING
        }
        


    });

    return PushSchema;
};
