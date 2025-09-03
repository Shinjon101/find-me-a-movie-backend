import { Request, Response } from "express";
import { GENRES } from "../data/genres";

export const getGenres = (req: Request, res: Response) => {
  res.json(GENRES);
};
