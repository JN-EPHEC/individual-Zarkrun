export default {
  preset: "ts-jest",
  testEnvironment: "node",

  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  testPathIgnorePatterns: ["/dist/"],

  moduleFileExtensions: ["ts", "js", "json"],

  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};