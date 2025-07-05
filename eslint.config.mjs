import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: "readonly",
      },
      sourceType: "module",
    },
    rules: {
      // Add any custom rules here
    },
  },
  {
    files: ["commitlint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        module: "readonly",
      },
      sourceType: "commonjs",
    },
  },
  {
    files: [
      "**/__tests__/**/*.js",
      "**/*.test.js",
      "**/jest.config.js",
      "**/webpack.config.js",
      "**/setup.js",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        chrome: "readonly",
        global: "readonly",
        module: "readonly",
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
  },
];
