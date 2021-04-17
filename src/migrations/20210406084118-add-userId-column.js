"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("orders", "user_id", {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("orders", "user_id");
  },
};
