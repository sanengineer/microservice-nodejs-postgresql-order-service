"use strict";

module.exports = (sequelize, Sequelize) => {
  order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      order_geo_loc: {
        type: Sequelize.GEOMETRY,
      },
      shipping_address: {
        type: Sequelize.STRING,
      },
      billing_address: {
        type: Sequelize.STRING,
      },
      mobile_phone: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      provinces: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      shipping_cost: {
        type: Sequelize.FLOAT,
      },
      shipping_platform: {
        type: Sequelize.STRING,
      },
      shipping_track_id: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
