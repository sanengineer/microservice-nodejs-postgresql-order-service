require("dotenv").config();
const fastify = require("fastify");
const userRoute = require("./src/routes/orderRoute");

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

const PORT = process.env.ORDER_PORT || 5000;
const HOSTNAME = process.env.ORDER_HOSTNAME || "localhost";

app.register(userRoute);
app.listen(PORT, () => console.log(`server run on http://${HOSTNAME}:${PORT}`));
