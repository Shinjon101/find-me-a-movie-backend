import { GENRES } from "../../data/genres";
import mapGenres from "../../utils/mapGenres";

describe("mapGenres", () => {
  it("should return an empty array when input is null", () => {
    expect(mapGenres(null)).toEqual([]);
  });
  it("should return an empty array when input is undefined", () => {
    expect(mapGenres(undefined)).toEqual([]);
  });
  it("should return an empty array when input is empty", () => {
    expect(mapGenres("")).toEqual([]);
  });
  it("should return correct genre for a single valid match", () => {
    const result = mapGenres("Action");

    expect(result).toEqual([GENRES.find((g) => g.name == "Action")]);
  });

  it(" should return multiple genres when input contains a comma-separated list", () => {
    const result = mapGenres("Action, Comedy");

    expect(result).toEqual([
      GENRES.find((g) => g.name == "Action"),
      GENRES.find((g) => g.name == "Comedy"),
    ]);
  });

  it("trims whitespace around genre names", () => {
    const result = mapGenres("  Action  ,   Comedy  ");
    expect(result).toEqual([
      GENRES.find((g) => g.name === "Action"),
      GENRES.find((g) => g.name === "Comedy"),
    ]);
  });

  it("ignores unknown genres not in GENRES", () => {
    const result = mapGenres("NotAGenre");
    expect(result).toEqual([]);
  });

  it("handles mix of valid and invalid genres", () => {
    const result = mapGenres("Action, InvalidGenre, Comedy");
    expect(result).toEqual([
      GENRES.find((g) => g.name === "Action"),
      GENRES.find((g) => g.name === "Comedy"),
    ]);
  });
});
