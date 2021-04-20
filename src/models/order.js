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
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
