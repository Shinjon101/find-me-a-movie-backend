import { Request, Response, NextFunction } from "express";
import {
  getMoviesSchema,
  getMovieSchema,
} from "../validations/moviesValidators";

export const validateGetMovies = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = getMoviesSchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  Object.assign(req.query, result.data);
  next();
};

export const validateGetMovie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = getMovieSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  Object.assign(req.params, result.data);
  next();
};
