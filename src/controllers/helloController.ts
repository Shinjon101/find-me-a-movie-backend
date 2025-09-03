import { Request, Response } from "express";

export const sayHello = (req: Request, res: Response) => {
  res.send("Find me a movie API server.");
};
