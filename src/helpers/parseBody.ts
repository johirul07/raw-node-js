import { IncomingMessage } from "http";

// ================================
// parseBody function
// ================================
// HTTP POST/PUT request এর body read এবং parse করার helper
// Async function, Promise return করে
async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ""; // সব incoming chunks string হিসেবে এখানে accumulate হবে

    // ================================
    // 1️⃣ "data" event: যখনও নতুন chunk of data আসে
    // ================================
    req.on("data", (chunk) => {
      // req.on → Node.js stream এ event listener attach করে
      // chunk Buffer type এ আসে → toString() করে string এ convert করা হচ্ছে
      body += chunk.toString();
    });

    // ================================
    // 2️⃣ "end" event: সব chunk এসে গেলে call হয়
    // ================================
    req.on("end", () => {
      try {
        // body যদি খালি না হয় → JSON.parse(body)
        // body খালি হলে → empty object return
        // resolve → Promise successful complete করে value return করে
        resolve(body ? JSON.parse(body) : {});
      } catch (err: any) {
        // JSON invalid হলে → Promise fail হবে এবং error return হবে
        // reject → Promise failure হিসেবে mark করে
        reject(err);
      }
    });

    // ================================
    // 3️⃣ "error" event: request stream এ error হলে call হয়
    // ================================
    req.on("error", reject); // কোনো error হলে Promise reject হয়
  });
}

export default parseBody;

/*
===============================
Deep Explanation (Inline)
===============================

1️⃣ কাজ:
   - HTTP request body read করে, JSON parse করে JS object/array return করে
   - Async, তাই `await parseBody(req)` ব্যবহার করা যায়

2️⃣ resolve এবং reject:
   - resolve(value): Promise সফলভাবে complete করে এবং value return করে
   - reject(error): Promise fail করে এবং error return করে

3️⃣ req.on(event, callback):
   - Node.js stream এ event listener attach করে
   - "data" → body chunk আসলে call হয়, string হিসেবে accumulate হয়
   - "end" → সব chunk শেষ হলে call হয়, JSON parse করা হয়
   - "error" → request stream error হলে call হয়

4️⃣ body accumulation:
   - data chunk-by-chunk আসে → body string এ যোগ করা হয়
   - শেষে JSON.parse করা হয়
   - যদি খালি হয় → empty object return হয়
*/
