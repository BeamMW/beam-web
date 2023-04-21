module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "vue/no-v-for-template-key": "off",
    "vue/multi-word-component-names": "off",
  },
};
