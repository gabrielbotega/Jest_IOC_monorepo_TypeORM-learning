module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts, tsx}"], // onde pega a coverage
  coverageDirectory: "coverage", // onde coloca a coverage
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  }, //sempre que ver algum teste com essa extensão, usa o ts-jest pra compilar
  testRegex: "./.*(/__test__/.*|\\.(test|spec))\\.(jsx?|tsx?)$",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  }, //vai substituir meu @/. qualquer coisa por : <rootDir>/src...
};
