/*
 * Module.exports = {
 *     env: {
 *       browser: true,
 *       es2020: true,
 *       node: true,
 *     },
 *     extends: [
 *       "eslint:recommended",
 *       "plugin:react/recommended",
 *       "prettier",
 *     ],
 *     parser: "@typescript-eslint/parser",
 *     parserOptions: {
 *       ecmaFeatures: {
 *         jsx: true,
 *       },
 *       ecmaVersion: 11,
 *       sourceType: "module",
 *     },
 *     plugins: [
 *       "react",
 *     ],
 *     rules: {
 *       quotes: ["error", "double"],
 *       "react/prop-types": "off",
 *       semi: ["error", "always"],
 *     },
 *   };
 */

module.exports = {
//   "extends": "eslint:all",
  "env": {
    "browser": true,
    "es2020": true,
    "node": true,
  },
  "rules": {
    "indent": [
      "error",
      2,
    ],
    "no-cond-assign": [
      "error",
      "always",
    ],
    "quotes": [
      "error",
      "double",
    ],
    // Disable now, but enable in the future
    "one-var": "off", // ["error", "never"]
    // Disable
    "init-declarations": "off",
    "no-console": "off",
    "no-inline-comments": "off",
  },
};
