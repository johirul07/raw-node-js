import dotenv from "dotenv";
import path from "path";

// ================================
// 1️⃣ .env ফাইল লোড করা
// ================================

// পদ্ধতি ১: __dirname ব্যবহার করে
// অর্থ: এই ফাইলের অবস্থান থেকে "../../.env" ফাইল খুঁজবে
console.log("Using __dirname path:", path.join(__dirname, "../../.env"));
dotenv.config({ path: path.join(__dirname, "../../.env") });

// পদ্ধতি ২: process.cwd() ব্যবহার করে
// অর্থ: terminal থেকে যে directory থেকে node run হচ্ছে, সেখানে ".env" ফাইল খুঁজবে
// ================================
// console.log("Using process.cwd() path:", path.join(process.cwd(), ".env"));
// dotenv.config({ path: path.join(process.cwd(), ".env") });

// ================================
// 2️⃣ Loaded environment variables দেখানো
// ================================
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.PORT:", process.env.PORT);

// ================================
// 3️⃣ Config object বানানো
// ================================

// env: NODE_ENV যদি থাকে, সেটা number এ convert করবে, না থাকলে 5000 হবে
// port: PORT যদি থাকে, number এ convert হবে, না থাকলে 5000 হবে
const config = {
    env: process.env.NODE_ENV ? Number(process.env.NODE_ENV) : 5000,
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
}

// ================================
// 4️⃣ Config object দেখানো
// ================================
console.log("Final Config object:", config);

export default config;
