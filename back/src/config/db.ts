import { Pool } from "pg";
import config from "./env.ts";

const pool = new Pool({ connectionString: config.database_url });

pool.on("error", (err) => {
    console.error("Postgres pool error:", err.message);
});

export default pool;
