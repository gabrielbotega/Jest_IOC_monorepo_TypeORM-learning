// jest.config.js
module.exports = {
  preset: "jest-preset-typescript",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
  testRegex: "./.*(/__tests__/.*|\\.(test|spec))\\.(jsx?|tsx?)$",
};
