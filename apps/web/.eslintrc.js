// /** @type {import("eslint").Linter.Config} */
// module.exports = {
//   root: true,
//   extends: ["@repo/eslint-config/next.js"],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: true,
//   },
// };

module.exports = {
  extends: [
    'mantine',
    'plugin:@next/next/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
  },
};
