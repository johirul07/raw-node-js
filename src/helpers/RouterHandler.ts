import { IncomingMessage, ServerResponse } from "http";

export type RouterHandler = (req: IncomingMessage, res: ServerResponse) => void;

export const routes: Map<string, Map<string, RouterHandler>> = new Map();
// {
//   "GET" → {
//       "/users" → handlerFunction
//   },
//   "POST" → {
//       "/login" → handlerFunction
//   }
// }
// মানে:

// বাইরের Map: method অনুযায়ী (GET/POST/PUT etc)

// ভিতরের Map: path অনুযায়ী ("/", "/users", "/login")



function addRoutes(method: string, path: string, handler: RouterHandler) {
  if (!routes.has(method)) routes.set(method, new Map()); //যদি GET বা POST নামে Map না থাকে, তাহলে নতুন Map বানানো হয়।
  routes.get(method)!.set(path, handler);
}

export default addRoutes;
