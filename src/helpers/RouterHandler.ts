import { IncomingMessage, ServerResponse } from "http";

// ================================
// 1️⃣ Define RouterHandler type
// ================================
// প্রতিটি handler function অবশ্যই এই signature অনুসারে হবে:
// - req: IncomingMessage (HTTP request object)
// - res: ServerResponse (HTTP response object)
export type RouterHandler = (req: IncomingMessage, res: ServerResponse) => void;

// ================================
// 2️⃣ Create routes Map
// ================================
// Outer Map: key = HTTP method ("GET", "POST", etc.)
// Outer Map: value = Inner Map (path -> handler)
// Inner Map: key = route path ("/users", "/login")
// Inner Map: value = handler function (RouterHandler)
export const routes: Map<string, Map<string, RouterHandler>> = new Map();

// ================================
// 3️⃣ addRoutes function
// ================================
function addRoutes(method: string, path: string, handler: RouterHandler) {
  
  // Step 1: Check if outer Map already has this method
  // Example: method = "GET"
  if (!routes.has(method)) {
    // যদি method না থাকে, একটি নতুন inner Map তৈরি করে outer Map এ set করো
    // Inner Map key = path, value = handler
    console.log(`Creating new route map for method: ${method}`);
    routes.set(method, new Map());
  }

  // Step 2: Add path → handler to inner Map
  // get(method)! → inner Map for this HTTP method
  // set(path, handler) → path + handler add করা হচ্ছে
  routes.get(method)!.set(path, handler);

  // Debug: কোন route add হলো তা দেখাও
  console.log(`Added route: [${method}] ${path} → ${handler.name || "anonymous function"}`);
}

// ================================
// 4️⃣ Export addRoutes
// ================================
export default addRoutes;
