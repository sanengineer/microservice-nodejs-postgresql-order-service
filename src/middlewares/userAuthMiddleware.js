const http = require("http");
const client = require("axios");
const axios = require("axios");

const dataResponse = "horray";

// console.log("data Response:", dataResponse);

module.exports = {
  userAuthentication: async (request, reply, done) => {
    if (!request.raw.headers.authorization) {
      return done(new Error("missing token"));
    }

    const tokenRaw = request.raw.headers.authorization;
    const bearerTokenSplitRaw = tokenRaw.split("Bearer")[1];
    const bearerToken = bearerTokenSplitRaw.replace(/\s/g, "");
    const userServiceHostname = process.env.USER_MICROSERVICES_HOSTNAME;
    const userServicePort = process.env.USER_MICROSERVICES_PORT;

    const token = JSON.stringify({
      token: `${bearerToken}`,
    });

    const options = {
      hostname: `${userServiceHostname}`,
      port: `${userServicePort}`,
      path: "/user/auth/authenticate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": token.length,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      // res.on("data", (d) => {
      //   process.stdout.write(d);
      // });

      res.on("close", () => {
        console.log("\nSTATUS_CODE:", res.statusCode, "\n");

        if (res.statusCode >= 400) {
          //debug
          console.log("\nDATA_RESPONSE:", JSON.parse(data), "\n");

          reply.statusCode = res.statusCode;
          reply.send(JSON.parse(data));
          // done();
        } else if (res.statusCode == 200) {
          //debug
          console.log(JSON.parse(data));

          // reply.send(dataResponse);
          done();
        }
      });
    });
    // done();

    req.write(token);
    // req.end();

    req.on("error", (error) => {
      console.log("request error:", error);
    });

    // request.log.info("test request middleware it's ok");
    //debug
    //   console.log("\n");
    //   console.log("bearer token:", "\n", bearerToken, "\n");
    //   console.log("request raw:", "\n", request.raw.headers, "\n");
    // console.log("reply raw:", "\n", reply.raw);
    console.log("\nTOKEN:", token, "\n");
    //   console.log("request nodejs:", "\n", userAuth());
    console.log("\nAUTH USER SERVICES:", options, "\n");
    // done();
  },

  userAuthenticationWithAxios: async (request, reply, done) => {
    if (!request.raw.headers.authorization) {
      reply.send(new Error("Missing Token"));
      // done();
    }

    const tokenRaw = request.raw.headers.authorization;
    const bearerTokenSplitRaw = tokenRaw.split("Bearer")[1];
    const bearerToken = bearerTokenSplitRaw.replace(/\s/g, "");
    const userServiceHostname = process.env.USER_MICROSERVICES_HOSTNAME;
    const userServicePort = process.env.USER_MICROSERVICES_PORT;
    const userServiceAuthPath = process.env.USER_MICROSERVICES_PATH;

    const payload = JSON.stringify({
      token: `${bearerToken}`,
    });

    try {
      const response = await axios({
        method: "post",
        baseURL: `http://${userServiceHostname}:${userServicePort}`,
        url: `${userServiceAuthPath}`,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        data: { token: `${bearerToken}` },
      });

      //debug
      console.log("\nAXIOS_RESPONSE:", response.data);

      // reply.send(response.data);
      reply.log.info(response.data);

      // done();
    } catch (err) {
      //debug
      console.log("\nERROR:", err.response.data);

      reply.send(err.response.data);
      // done();
    }

    //debug
    console.log("\nPAYLOAD:", payload);
  },
};
