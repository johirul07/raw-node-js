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

addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;
  const body = await parseBody(req);

  const users = readUsers() || [];
  const index = users.findIndex((user: any) => user.id == id);
  if (index === -1) {
    sendJson(res, 404, { success: false, message: "User not found" });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);

  sendJson(res, 202, {
    success: true,
    message: `id: ${id} updated`,
    data: users[index],
  });
});
