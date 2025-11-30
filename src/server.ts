import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server Is Ruing...");

    //* root route
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello World node js with typescript....",
          path: req.url,
        })
      );
    }

    //? ------------------------------------------

    //*health router

    if (req.url == "/api" && req.method == "GET") {
    }

    // ?---------------------------------------------

    if (req.url == "/api/users" && req.method == "POST") {
      // const user = {
      //   id: 1,
      //   name: "jahirul",
      //   age: 23
      // };
      // res.writeHead(200, { "content-type": "application/json" });
      // res.end(JSON.stringify(user));


      //!row data er body

      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const praseBody = JSON.parse(body);
        console.log(praseBody);
        res.end(JSON.stringify(praseBody));
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
