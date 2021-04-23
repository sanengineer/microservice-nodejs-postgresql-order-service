"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      },
      cart_id: {
        type: Sequelize.UUID,
        unique: true,
      },
      user_id: {
        unique: true,
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
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  order.beforeCreate((order) => (order.id = uuidv4()));
  return order;
};
