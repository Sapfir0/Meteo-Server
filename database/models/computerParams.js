module.exports = function (sequelize, Sequelize) {
    var ComputerParams = sequelize.define('computerParams', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        HDD_temp: { 
            type: Sequelize.INTEGER
        },
        CPU_temp: {
            type: Sequelize.INTEGER
        },
        CPU_currentLoad: {
            type: Sequelize.INTEGER
        },
        CPU_5minute_load: {
            type: Sequelize.INTEGER
        },
        CPU_15minute_load: {
            type: Sequelize.INTEGER
        },
        CPU_load_iostat: {
            type: Sequelize.INTEGER,
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
        PC_id: {
            type: Sequelize.INTEGER,
        }

    });

    return ComputerParams;
};