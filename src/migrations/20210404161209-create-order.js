"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM("pending", "process", "done", "canceled"),
        defaultValue: "pending",
      },
      payment_url: {
        type: Sequelize.TEXT,
      },
      tax: {
        type: Sequelize.FLOAT,
      },
      diskon: {
        type: Sequelize.FLOAT,
      },
      shipping_platform: {
        type: Sequelize.STRING(20),
      },
      shipping_cost: {
        type: Sequelize.FLOAT,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      grand_total: {
        type: Sequelize.FLOAT,
      },
      shipping_track_id: {
        type: Sequelize.TEXT,
      },
      shipping_address: {
        type: Sequelize.TEXT,
      },
      collect_self: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      cart_id: {
        type: Sequelize.UUID,
        unique: true,
      },
      user_id: {
        // unique: true,
        type: Sequelize.UUID,
      },
      order_geo_loc: {
        type: Sequelize.GEOMETRY,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(50),
      },
      mobile_phone: {
        type: Sequelize.STRING(20),
      },
      city: {
        type: Sequelize.STRING(20),
      },
      provinces: {
        type: Sequelize.STRING(20),
      },
      postal_code: {
        type: Sequelize.STRING(20),
      },
      country: {
        type: Sequelize.STRING,
      },
      billing_address: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};
