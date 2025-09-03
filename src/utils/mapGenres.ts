import { GENRES } from "../data/genres";

const mapGenres = (genreString: string | undefined) => {
  if (!genreString) return [];
  const names = genreString.split(",").map((g) => g.trim());
  return GENRES.filter((g) => names.includes(g.name));
};

export default mapGenres;
