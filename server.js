require("dotenv").config();
const { error } = require("console");
const fastify = require("fastify");
const http = require("http");
const { callbackify } = require("util");

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(require("fastify-auth"));

// const x = () => {
//   app.route({
//     method: "POST",
//     url: `${userServiceHostname}/user/auth/authenticate`,
//     handler: function (req, res) {
//       req.log.info("test token");
//       req.send({ token: `${bearerToken}` });
//     },
//   });
// };

const verify = (request, reply, done) => {
  if (!request.raw.headers.authorization) {
    return done(new Error("missing token"));
  }

  const tokenRaw = request.raw.headers.authorization;
  const bearerTokenSplitRaw = tokenRaw.split("Bearer")[1];
  const bearerToken = bearerTokenSplitRaw.replace(/\s/g, "");
  const userServiceHostname = "localhost";
  const userServicePort = 4568;

  const postData = JSON.stringify({
    token: `${bearerToken}`,
  });

  const options = {
    hostname: `${userServiceHostname}`,
    port: `${userServicePort}`,
    path: "/user/auth/authenticate",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  //   const req = http.request(options, (res) => {
  //     console.log(`\nstatus:\n${res.statusCode}\n`);
  //     console.log(`\nheader:\n ${res.rawHeaders}\n`);
  //     console.log(`\rbody:${res}`);

  //     res.on("data", (d) => {
  //       process.stdout.write(d);
  //     });
  //   });
  //   req.on("error", (error) => {
  //     console.error("test:", error);
  //   });
  //   req.write(data);
  // req.end();

  const req = http.request(options, (res) => {
    if (res.statusCode !== 201) {
      console.error(
        `Did not get a Created from the server. Code: ${res.statusCode}`
      );
      res.resume();
      return;
    }

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    // res.on("data", (d) => {
    //   process.stdout.write(d);
    // });

    res.on("close", () => {
      //   console.log("Added new user");
      console.log(JSON.parse(data));
    });
  });

  req.write(postData);
  //   req.end();

  req.on("error", (error) => {
    console.log("request error:", error);
  });

  //   reply.send(x());
  request.log.info("test request middleware it's ok");

  //   console.log("reply:", req);
  //
  //debug
  //   console.log("\n");
  //   console.log("bearer token:", "\n", bearerToken, "\n");
  //   console.log("request raw:", "\n", request.raw.headers, "\n");
  //   console.log("reply raw:", "\n", reply.raw);
  //   console.log("data body:", "\n", data);
  //   console.log("request nodejs:", "\n", userAuth());
  //   console.log("auth user services:", "\n", options);
  //   done();
};

app.get("/", (req, res) => {
  res.send({ message: "welcome to order restapi" });
});

app.route({
  method: "GET",
  url: "/order",
  //   schema: {
  //     querystring: {
  //       name: { type: "string" },
  //       excitement: { type: "integer" },
  //     },
  //     response: {
  //       201: {
  //         type: "object",
  //         properties: {
  //           hello: { type: "string" },
  //         },
  //       },
  //     },
  //   },
  preHandler: verify,
  handler: function (req, res) {
    req.log.info("log info route order method:GET");
    res.send({ message: "hello world" });
  },
});

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// app.register(api);
app.listen(PORT, () => console.log(`server run on http://${HOSTNAME}:${PORT}`));
