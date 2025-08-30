import { Request, Response } from "express";
import { Movie } from "../models/Movie";

export const getPopMovie = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sortBy = (req.query.sort_by as string) || "popularity_and_vote";
    const query = (req.query.query as string) || "";

    const sortOptions: Record<string, any> = {
      popularity: { popularity: -1 },
      release_date: { release_date: -1 },
      vote_average: { vote_average: -1 },
      popularity_and_vote: { popularity: -1, vote_average: -1 },
    };

    const sort = sortOptions[sortBy] || sortOptions["popularity_and_vote"];

    const searchCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const totalResults = await Movie.countDocuments(searchCondition);

    const movies = await Movie.find(searchCondition)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({
      page,
      results: movies,
      total_pages: Math.ceil(totalResults / limit),
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};
