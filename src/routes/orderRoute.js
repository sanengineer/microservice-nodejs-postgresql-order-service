const userController = require("../controllers/orderController");
const userAuthentication = require("../middlewares/userAuthMiddleware");

const api = async (app) => {
  app.route({
    method: "GET",
    url: "/order",
    preHandler: userAuthentication,
    handler: userController.getAllOrder,
  });

  app.route({
    method: "GET",
    url: "/order/:order_id",
    preHandler: userAuthentication,
    handler: userController.getOneOrder,
  });

  app.route({
    method: "GET",
    url: "/order/result",
    preHandler: userAuthentication,
    handler: userController.findOneOrder,
  });

  app.route({
    method: "GET",
    url: "/order/count",
    preHandler: userAuthentication,
    handler: userController.countAllOrder,
  });

  app.route({
    method: "POST",
    url: "/order",
    preHandler: userAuthentication,
    handler: userController.createOrder,
  });

  app.route({
    method: "PUT",
    url: "/order/:order_id",
    preHandler: userAuthentication,
    handler: userController.updateOrder,
  });

  app.route({
    method: "DELETE",
    url: "/order/:order_id",
    preHandler: userAuthentication,
    handler: userController.deleteOrder,
  });
};

module.exports = api;
