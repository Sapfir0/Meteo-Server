module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define("users", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        email: { 
            type: Sequelize.STRING, 
            unique: true, 
            validate: { 
                isEmail: true 
            } 
        },
        password: { 
            type: Sequelize.STRING, 
            allowNull: false,
            len: [5,50],
        },
        meteostationId: { 
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'meteostation',
            //     key: 'id'
            // }
        },
        PC_Id: {
            type: Sequelize.INTEGER,
        }
    });

    return User;
};
