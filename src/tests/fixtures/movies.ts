import { Movie } from "../../models/Movie";

export const seedMovies = async () => {
  await Movie.deleteMany({});

  const movies = [];

  for (let i = 1; i <= 15; i++) {
    movies.push({
      id: i,
      title: `Movie ${i}`,
      genres: "Action",
      popularity: 100 - i, // descending
      vote_average: 5 + (i % 5), // rotating values
      vote_count: 100 + i, // pass filter
      budget: 1000000 + i,
      release_date: new Date(2010 + i, 0, 1),
    });
  }

  return Movie.insertMany(movies);
};
