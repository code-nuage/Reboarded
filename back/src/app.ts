import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

import route_helloworld from "./routes/helloworld.ts";

route_helloworld(app);

export default app;
