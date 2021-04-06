const http = require("http");
const userAuthentication = (request, reply, done) => {
  if (!request.raw.headers.authorization) {
    return done(new Error("missing token"));
  }

  const tokenRaw = request.raw.headers.authorization;
  const bearerTokenSplitRaw = tokenRaw.split("Bearer")[1];
  const bearerToken = bearerTokenSplitRaw.replace(/\s/g, "");
  const userServiceHostname = process.env.USER_MICROSERVICES_HOSTNAME;
  const userServicePort = process.env.USER_MICROSERVICES_PORT;

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

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    // res.on("data", (d) => {
    //   process.stdout.write(d);
    // });

    res.on("close", () => {
      console.log("statuscode", res.statusCode);

      if (res.statusCode == 401) {
        //
        //debug
        console.log(JSON.parse(data));

        reply.statusCode = res.statusCode;
        reply.send(JSON.parse(data));
      } else if (res.statusCode == 200) {
        //
        //debug
        console.log(JSON.parse(data));
        done();
      }
    });
  });

  req.write(postData);
  //   req.end();

  req.on("error", (error) => {
    console.log("request error:", error);
  });

  request.log.info("test request middleware it's ok");

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

module.exports = userAuthentication;
