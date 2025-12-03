import { routes } from "./RouterHandler";

// ================================
// findDynamicRoute function
// ================================
// purpose: HTTP method + URL অনুযায়ী dynamic route খুঁজে বের করা
// যদি path parameters ("/users/:id") থাকে → extract করে params return করে
function findDynamicRoute(method: string, url: string) {
  // ================================
  // 1️⃣ Get inner Map for this HTTP method
  // ================================
  const methodMap = routes.get(method); 
  // routes: Map<string, Map<string, RouterHandler>>
  // methodMap: Map<path, handler> যদি method exist করে

  if (!methodMap) return null; 
  // যদি method না থাকে, তাহলে কোন route match করবে না → null return

  // ================================
  // 2️⃣ Loop through all paths for this method
  // ================================
  for (const [routePath, handler] of methodMap) {
    // routePath: "/users/:id" ইত্যাদি
    // handler: RouterHandler function

    const routePaths = routePath?.split("/"); // split route into segments
    const urlPaths = url?.split("/");         // split requested URL into segments

    if (routePaths?.length !== urlPaths?.length) continue;
    // যদি segment count mismatch হয় → skip

    const params: any = {}; // dynamic parameters holder
    let matched = true;     // route match flag

    // ================================
    // 3️⃣ Loop through segments and compare
    // ================================
    for (let i = 0; i < routePaths.length; i++) {
      if (routePaths[i]?.startsWith(":")) {
        // dynamic parameter detected → ":id"
        // remove ":" → key name, assign value from urlPaths
        params[routePaths[i]?.substring(1)!] = urlPaths[i];
      } else if (routePaths[i] != urlPaths[i]) {
        // fixed path segment mismatch → route does not match
        matched = false;
        break;
      }
    }

    // ================================
    // 4️⃣ If matched → return handler + params
    // ================================
    if (matched) {
      return { handler, params }; 
      // Example: { handler: getUserHandler, params: { id: "123" } }
    }
  }

  // ================================
  // 5️⃣ No match found → return null
  // ================================
  return null;
}

export default findDynamicRoute;

/*
===============================
Deep Explanation
===============================

1️⃣ methodMap = routes.get(method)
   - Outer Map থেকে inner Map (path → handler) বের করে
   - যদি method না থাকে → null

2️⃣ routePath.split("/") vs url.split("/")
   - "/" দিয়ে split → route segments
   - যেমন: "/users/:id" → ["", "users", ":id"]

3️⃣ segment count check
   - যদি segment length mismatch → route impossible → continue

4️⃣ Loop through segments
   - routePath segment ":" দিয়ে শুরু হলে → dynamic param
   - ":" remove → key, urlPaths[i] → value
   - fixed segment mismatch → matched = false → break

5️⃣ matched = true → return { handler, params }
   - matched হলে handler + extracted params return
   - null → no match

6️⃣ Dynamic routing support
   - "/users/:id" + "/users/123" → { id: "123" }
   - supports multiple dynamic params
*/
