import { routes } from "./RouterHandler";

function findDynamicRoute(method: string, url: string) {
  const methodMap = routes.get(method);

  if (!methodMap) return null;

  for (const [routePath, handler] of methodMap) {
    const routePaths = routePath?.split("/");
    const urlPaths = url?.split("/");

    if (routePaths?.length !== urlPaths?.length) continue;

    const params: any = {};
    let matched = true;

    for (let i = 0; i < routePaths.length; i++) {
      if (routePaths[i]?.startsWith(":")) {
        params[routePaths[i]?.substring(1)!] = urlPaths[i];
      } else if (routePaths[i] != urlPaths[i]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return { handler, params };
    }
  }

  return null;
}

export default findDynamicRoute;
