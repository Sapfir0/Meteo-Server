'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('arduino', 'role', {
        type: Sequelize.STRING,
        allowNull: false
    })
  },
  //https://github.com/sequelize/cli/issues/133
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user', 'role');
  }
};