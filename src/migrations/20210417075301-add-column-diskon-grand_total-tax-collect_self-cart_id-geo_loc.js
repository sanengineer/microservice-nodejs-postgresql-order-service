"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("orders", "diskon", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("orders", "grand_total", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("orders", "tax", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("orders", "collect_self", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("orders", "cart_id", {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("orders", "diskon"),
      queryInterface.removeColumn("orders", "grand_total"),
      queryInterface.removeColumn("orders", "tax"),
      queryInterface.removeColumn("orders", "collect_self"),
      queryInterface.removeColumn("orders", "cart_id"),
    ]);
  },
};
