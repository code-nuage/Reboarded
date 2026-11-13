import { type Request, type Response } from "express";

export async function helloworld(req: Request, res: Response) {
  res.json({ message: "Hello World!" });
}
