export default {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],

  setupFilesAfterEnv: ["<rootDir>/src/tests/setup/jest.setup.ts"],

  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
};
