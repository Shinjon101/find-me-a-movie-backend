export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src/tests"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
