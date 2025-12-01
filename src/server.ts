import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouterHandler, routes } from "./helpers/RouterHandler";
import "./routes";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server Is Ruing...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const mapMethod = routes.get(method);
    const handler: RouterHandler | undefined = mapMethod?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
          path,
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
