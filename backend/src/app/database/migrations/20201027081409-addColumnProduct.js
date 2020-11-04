'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("products", 'details', Sequelize.TEXT);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('products', 'details');
  }
};
