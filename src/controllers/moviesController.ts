import { Request, Response } from "express";
import { Movie } from "../models/Movie";
import mapGenres from "../utils/mapGenres";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sortBy = req.query.sort_by as string;
    const query = (req.query.query as string) || "";

    const sortOptions: Record<string, any> = {
      popularity: { popularity: -1 },
      release_date: { release_date: -1 },
      vote_average: { vote_average: -1 },
    };

    const sort = sortOptions[sortBy] || sortOptions["popularity"];

    const searchCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const totalResults = await Movie.countDocuments(searchCondition);

    const movies = await Movie.find(searchCondition)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const moviesWithGenres = movies.map((m) => ({
      ...m.toObject(),
      genres: mapGenres(m.genres),
    }));

    return res.json({
      page,
      results: moviesWithGenres,
      total_pages: Math.ceil(totalResults / limit),
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({
      ...movie.toObject(),
      genres: mapGenres(movie.genres),
    });
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
