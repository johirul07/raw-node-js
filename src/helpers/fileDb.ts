import path from "path";
import fs from "fs";

// ================================
// filePath: JSON file location
// ================================
// process.cwd() → current working directory (যেখান থেকে node command run হচ্ছে)
// "./src/data/users.json" → relative path থেকে absolute path তৈরি
const filePath = path.join(process.cwd(), "./src/data/users.json");

// ================================
// readUsers function
// ================================
// JSON file থেকে সব users read করে এবং JS object/array return করে
export function readUsers() {
  // fs.readFileSync → synchronous read
  // "utf-8" → read data string হিসেবে
  const data = fs.readFileSync(filePath, "utf-8");

  // JSON.parse → string → JS object/array
  return JSON.parse(data);
}

// ================================
// writeUsers function
// ================================
// users object/array কে JSON file এ save করে
export function writeUsers(users: any) {
  // JSON.stringify(users, null, 2)
  // - users → object/array
  // - null → replacer (not used)
  // - 2 → indentation, file readable করে
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

/*
===============================
Deep Explanation
===============================

1️⃣ filePath:
   - Absolute path generate করা হয়েছে, যাতে file location নির্ভরশীল না হয়
   - process.cwd() → যেখান থেকে node run করা হচ্ছে

2️⃣ readUsers():
   - File synchronous ভাবে read করে
   - UTF-8 encoding → string হিসেবে data read হয়
   - JSON.parse → string → JS object/array
   - Return value → user data usable JS object

3️⃣ writeUsers(users):
   - JS object/array → JSON string (JSON.stringify)
   - null, 2 → indentation, file readable
   - fs.writeFileSync → synchronous write, old data overwrite হয়

4️⃣ Note:
   - readFileSync/writeFileSync synchronous, ছোট files জন্য safe
   - বড় files বা production এ asynchronous fs methods ব্যবহার করা উত্তম
*/
