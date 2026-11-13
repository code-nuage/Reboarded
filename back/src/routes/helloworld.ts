import { type Express, type Request, type Response } from "express";

import { helloworld } from "../controllers/helloworld.ts";

export default (app: Express) => {
  app
    .get("/", helloworld);
}
