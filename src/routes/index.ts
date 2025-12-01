import { readUsers, writeUsers } from "../helpers/fileDb";
import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouterHandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    message: "Hello World node js with typescript....",
    path: req.url,
  });
});

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: "Health is ok",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);

  const users = readUsers() || [];

  const newUsers = {
    id: Date.now(),
    ...body,
  };

  users?.push(newUsers);

  writeUsers(users);

  sendJson(res, 200, { success: true, data: body });
});
