console.log("USING jest.config.js!!");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // "^msw$": "<rootDir>/node_modules/msw",
    // "^msw/node$": "<rootDir>/node_modules/msw/lib/node",
  },
  setupFiles: ["./jest.polyfills.js"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/__test__/"],
  transformIgnorePatterns: [
    "node_modules/(?!axios)",
    "[/\\\\]node_modules[/\\\\].+[^esm]\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "<rootDir>/node_modules/@bundled-es-modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest", // Default transformer for JS files
    "^.+\\.tsx?$": "ts-jest", // Default transformer for TypeScript files
    "^.+\\.js$": "babel-jest", // ESBuild transformer for JS files
    "^.+\\.ts$": "ts-jest", // ESBuild transformer for TypeScript files
  },
};
