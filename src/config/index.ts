import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") }); //?dui vabei path definds korte pari 
dotenv.config({ path: path.join(process.cwd(), ".env") }); // eta root file ber korte hole terminal e node > process.cwd()
// 'C:\\Users\\JOHIRUL\\Desktop\\Level 2\\NodeJsCoreModule\\nodejs'


const config = {
    env: process.env.NODE_ENV ? Number(process.env.NODE_ENV) : 5000,
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
}

export default config;