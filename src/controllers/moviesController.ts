import { Request, Response } from "express";
import { Movie } from "../models/Movie";

export const getPopMovie = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
      .sort({ popularity: -1 })
      .limit(10)
      .select("title popularity");

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.json(movies);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};
