module.exports = function (sequelize, Sequelize) {
    var ComputerParams = sequelize.define("computerParams", {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        HDD_temp: { 
            type: Sequelize.DOUBLE,
            allowNull: false 
        },
        CPU_temp: {
            type: Sequelize.DOUBLE,
            allowNull: false 
        },
        CPU_currentLoad: {
            type: Sequelize.DOUBLE,
            allowNull: false 
        },
        CPU_5minute_load: {
            type: Sequelize.DOUBLE,
            allowNull: false 
        },
        CPU_15minute_load: {
            type: Sequelize.DOUBLE,
            allowNull: false 
        },
        CPU_load_iostat: {
            type: Sequelize.DOUBLE,
            allowNull: false 
            //от 0 до 100
        },
        unused_RAM: {
            type: Sequelize.INTEGER,
        },
        GPU_temp: {
            type: Sequelize.INTEGER,
        },
        GPU_load: {
            type: Sequelize.INTEGER,
        },
        PC_Id: {
            type: Sequelize.INTEGER,
        }

    });

    return ComputerParams;
};