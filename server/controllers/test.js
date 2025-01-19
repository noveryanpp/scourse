import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

const server = process.env.MIDTRANS_SERVER_KEY;

console.log(server);
