import { z } from "zod";
import mongoose from "mongoose";
export const getMoviesSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100",
    }),

  sort_by: z
    .enum(["popularity", "release_date", "vote_average"])
    .optional()
    .default("popularity"),

  search: z.string().optional().default(""),
});

export const getMovieSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "Movie ID must be a number" }),
});
