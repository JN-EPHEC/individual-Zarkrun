import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  testPathIgnorePatterns: ["/dist/"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  moduleFileExtensions: ["ts", "js", "json"],

  roots: ["<rootDir>/src"],
};