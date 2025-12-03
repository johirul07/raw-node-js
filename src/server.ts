import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config"; // port, env settings
import { RouterHandler, routes } from "./helpers/RouterHandler"; // routes Map এবং RouterHandler type
import "./routes"; // এখানে সব routes add করা হবে (addRoutes calls)
import findDynamicRoute from "./helpers/dynamicRouteHandler"; // dynamic routes handler

// ================================
// 1️⃣ Create HTTP server
// ================================
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server Is Running...");

    // ================================
    // 2️⃣ Get method and path
    // ================================
    const method = req.method?.toUpperCase() || ""; // "GET", "POST", etc
    const path = req.url || "";                    // requested URL

    // ================================
    // 3️⃣ Check static routes
    // ================================
    const mapMethod = routes.get(method);          // inner Map for this method
    const handler: RouterHandler | undefined = mapMethod?.get(path); // exact match

    if (handler) {
      // ================================
      // 4️⃣ Static route matched
      // ================================
      handler(req, res); // call handler function
    } else if (findDynamicRoute(method, path)) {
      // ================================
      // 5️⃣ Dynamic route matched
      // ================================
      const match = findDynamicRoute(method, path); // { handler, params }

      // attach params to req object
      (req as any).params = match?.params;

      // call handler
      match?.handler(req, res);
    } else {
      // ================================
      // 6️⃣ Route not found → 404 response
      // ================================
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

// ================================
// 7️⃣ Start server
// ================================
server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

/*
===============================
Deep Explanation (Inline)
===============================

1️⃣ http.createServer((req, res) => {...})
   - Incoming HTTP request handle করার জন্য callback
   - req: IncomingMessage, res: ServerResponse

2️⃣ method & path
   - req.method → HTTP method
   - req.url → requested URL path
   - toUpperCase() → normalize method for routes Map lookup

3️⃣ Static route check
   - routes.get(method) → inner Map (path → handler)
   - mapMethod.get(path) → exact path match
   - যদি match → call handler

4️⃣ Dynamic route
   - findDynamicRoute(method, path) → check for routes with params
   - match found → attach params to req (req.params)
   - call handler

5️⃣ 404 route
   - যদি কোন route match না করে → 404 response
   - content-type JSON → client knows JSON response
   - body → success: false, message, path

6️⃣ server.listen(config.port)
   - server start করে, listening port
   - console.log → debug, server ready
*/
