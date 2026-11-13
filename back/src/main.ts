import config from "./config/env.ts";
import pool from "./config/db.ts";

import app from "./app.ts";

app.listen(config.port, () => { `Server listening at localhost:${config.port}` });
