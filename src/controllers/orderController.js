const db = require("../models");
const Order = db.order;

module.exports = {
  getAllOrder: async function (req, res) {
    //
    //debug
    // req.log.info("read orders");

    Order.findAll()
      .then((data) => {
        //
        //debug
        // console.log("get all order:", data);

        if (data != 0) {
          res.statusCode = 200;
          res.send(data);
        } else {
          res.statusCode = 204;
        }
      })
      .catch((error) => {
        //
        //debug
        console.log("\nerror:", error.message, "\n");
        res.statusCode = 500;
        res.send();
      });
  },

  getOneOrder: async function (req, res) {
    //
    //debug
    // console.log("\nreq params:", req.params, "\n");
    // req.log.info("read order");

    const id = req.params.order_id;

    Order.findByPk(id)
      .then((data) => {
        if (!data) {
          return (res.statusCode = 401), res.send({ message: "not found" });
        } else {
          res.statusCode = 200;
          res.send(data);
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  },

  countAllOrder: async (req, res) => {
    //
    //debug
    // req.log.info("query order");

    Order.count()
      .then((data) => {
        res.statusCode = 200;
        res.send(data);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  },

  findOneOrder: async (req, res) => {
    //
    //debug
    // console.log("\n req params:", req.query);
    // req.log.info("query order");

    res.send({ message: "query order route" });
  },

  getOrderByUserId: async (req, res) => {
    const user_id = req.params.user_id;

    Order.findAll({ where: { user_id: user_id } })
      .then((data) => {
        //
        //debug
        console.log(data);

        res.statusCode = 200;
        res.send(data);
      })
      .catch((e) => {
        //
        //debug
        console.log(e);

        res.statusCode = 500;
        res.send(e);
      });
  },

  getCountOrderUserId: async (req, res) => {
    const user_id = req.params.user_id;
    Order.count({ where: { user_id: user_id } })
      .then((data) => {
        //
        //debug
        console.log(data);

        res.statusCode = 200;
        res.send(data);
      })
      .catch((e) => {
        //
        //debug
        console.log(e);

        res.statusCode = 500;
        res.send(e);
      });
  },

  createOrder: async (req, res) => {
    //
    //debug
    // req.log.info("create order");

    const new_order = req.body;

    Order.create(new_order)
      .then((data) => {
        res.statusCode = 200;
        res.send({
          name: data.name,
        });
      })
      .catch((error) => {
        //
        //debug
        console.log("\nerror message:", error, "\n");

        res.send({ message: error.message });
      });
  },

  updateOrder: async (req, res) => {
    //
    //debug
    // req.log.info("update order");

    const id = req.params.order_id;

    Order.update(req.body, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.statusCode = 200;
          res.send({ order_id: id, message: `order was updatedy successfull` });
        } else {
          res.statusCode = 404;
          res.send({ order_id: id, message: "can't update order" });
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  },

  deleteOrder: async (req, res) => {
    //
    //debug
    // req.log.info("delete order");

    const id = req.params.order_id;

    Order.destroy({ where: { id: id } })
      .then((data) => {
        //
        //debug
        console.log("data:", data);

        if (data == 0) {
          return (res.statusCode = 204), res.send();
        } else {
          return (
            (res.statusCode = 200),
            res.send({ order_id: id, message: "order deleted successfully" })
          );
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  },

  deleteAllOrder: async (req, res) => {
    Order.destroy({ where: {}, truncate: true })
      .then((data) => {
        if (data == 0) {
          res.statusCode = 204;
          res.send();
        }
      })
      .catch((e) => {
        res.statusCode = 500;
        res.send(e);
      });
  },
};
