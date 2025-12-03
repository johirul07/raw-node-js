import { ServerResponse } from "http";

// ================================
// sendJson function
// ================================
function sendJson(
  res: ServerResponse, // ServerResponse object, Node.js HTTP server এ প্রতিটি request এর জন্য ব্যবহৃত
  stateCode: number, // HTTP status code (200, 404, 500 ইত্যাদি) → number type, কারণ status always number
  data: any // response body হিসেবে পাঠানোর value (object, array, string, number) → any type
) {
  // ================================
  // 1️⃣ writeHead: status code + headers সেট করা
  // ================================
  res.writeHead(
    stateCode, // HTTP response status code
    { "content-type": "application/json" } // HTTP header, client কে বলে response JSON format
  );
  // res.writeHead মানে:
  // - প্রথম argument → HTTP status code
  // - দ্বিতীয় argument → headers, key:value pair
  // "content-type": "application/json" → client জানবে response JSON data

  // ================================
  // 2️⃣ JSON.stringify(data): JS object → JSON string
  // ================================
  const jsonData = JSON.stringify(data);
  // JS object সরাসরি পাঠানো যাবে না, HTTP response সবসময় string/Buffer চাই

  // ================================
  // 3️⃣ res.end(): response পাঠানো এবং connection close করা
  // ================================
  res.end(jsonData);
  // client receives: HTTP status code + headers + response body(JSON string)
}

// ================================
// 4️⃣ Export helper function
// ================================
export default sendJson;
