module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"],
  testMatch: ["<rootDir>/__tests__/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "!__tests__/**", "!**/*.test.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
