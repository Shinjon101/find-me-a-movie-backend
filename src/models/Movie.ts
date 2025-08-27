import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  vote_average: {
    type: Number,
    default: 0,
    index: true,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
  release_date: {
    type: Date,
    index: true,
  },
  runtime: {
    type: Number,
  },
  backdrop_path: {
    type: String,
  },
  budget: {
    type: Number,
  },
  original_language: {
    type: String,
    index: true,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
    default: 0,
    index: true,
  },
  poster_path: {
    type: String,
  },
  genres: {
    type: String,
    index: true,
  },
});

movieSchema.index({ title: "text", overview: "text" });

movieSchema.index({ genres: 1, popularity: -1 });
movieSchema.index({ genres: 1, vote_average: -1 });
movieSchema.index({ release_date: -1, popularity: -1 });

export const Movie = mongoose.model("Movie", movieSchema, "Movies");
