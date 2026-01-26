import { Movie } from "../../models/Movie";

export const seedMovies = async () => {
  await Movie.deleteMany({});

  return Movie.insertMany([
    {
      id: 1,
      title: "The Avengers",
      genres: "Action,Adventure",
      popularity: 100,
      vote_average: 8,
      vote_count: 200,
      budget: 220000000,
      release_date: new Date("2012-01-01"),
    },
    {
      id: 2,
      title: "Avengers: Age of Ultron",
      genres: "Action",
      popularity: 80,
      vote_average: 7,
      vote_count: 150,
      budget: 250000000,
      release_date: new Date("2015-01-01"),
    },
    {
      id: 3,
      title: "Comedy Movie",
      genres: "Comedy",
      popularity: 10,
      vote_average: 6,
      vote_count: 30,
      budget: 5000000,
      release_date: new Date("2010-01-01"),
    },
  ]);
};
