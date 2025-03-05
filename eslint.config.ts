import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import type { Linter } from "eslint";
import eslintPluginVue from "eslint-plugin-vue";
import { resolve } from "node:path";
import tseslint from "typescript-eslint";
import eslintParserVue from "vue-eslint-parser";

const gitignorePath = resolve(import.meta.dirname, ".gitignore");

const eslintRules: Linter.RulesRecord = {
  "arrow-body-style": ["error", "as-needed"],
  curly: "error",
  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-else-return": "error",
};

const tsRules: Linter.RulesRecord = {
  // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],

  // Opinionated configuration
  "@typescript-eslint/array-type": [
    "error",
    { default: "array-simple", readonly: "generic" },
  ],
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      disallowTypeAnnotations: false,
      fixStyle: "separate-type-imports",
      prefer: "type-imports",
    },
  ],
  "@typescript-eslint/no-inferrable-types": [
    "error",
    { ignoreParameters: true },
  ],
};

const config = tseslint.config(
  //#region global
  includeIgnoreFile(gitignorePath),
  {
    name: "manual ignores",
    ignores: ["eslint.config.ts"],
  },
  {
    name: "linter options",
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  //#endregion

  //#region eslint (js)
  eslint.configs.recommended,
  {
    name: "eslint overrides",
    rules: eslintRules,
  },
  //#endregion

  //#region typescript-eslint
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "typescript-eslint overrides",
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.json",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      ...eslintRules,

      // TODO cquadflieg 2024-10-11: These are even double enabled by typescript-eslint
      "no-cond-assign": "off",
      "no-constant-binary-expression": "off",
      "no-control-regex": "off",
      "no-empty": "off",
      "no-fallthrough": "off",
      "no-prototype-builtins": "off",
      "no-unused-private-class-members": "off",
      "no-useless-escape": "off",

      // TODO cquadflieg 2024-10-30: Investigate later if these should be re-enabled (included in recommendedTypeChecked)
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",

      // TODO cquadflieg 2024-10-11: Investigate later if these should be re-enabled (included in stylisticTypeChecked)
      "@typescript-eslint/class-literal-property-style": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",

      ...tsRules,
    },
  },
  //#endregion

  //#region eslint-plugin-vue
  ...eslintPluginVue.configs["flat/recommended"],
  {
    name: "vue overrides",
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: eslintParserVue,
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      ...eslintRules,

      // TODO cquadflieg 2024-10-11: Investigate later if these should be re-enabled (included in stylisticTypeChecked)
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",

      ...tsRules,

      // Not needed, because it's handled by prettier
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",

      // If we use `v-html`, we know what we are doing
      "vue/no-v-html": "off",

      // TODO cquadflieg 2024-10-25: Enable in separate MR
      "vue/no-template-shadow": "off",
      "vue/require-default-prop": "off",
      "vue/require-prop-types": "off",

      // Opinionated configuration
      "vue/attribute-hyphenation": [
        "error",
        "always",
        {
          ignore: ["ariaDescribedby", "innerHTML"],
        },
      ],
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: "ts",
          },
        },
      ],
      "vue/block-order": [
        "error",
        {
          order: ["script:not([setup])", "script[setup]", "template", "style"],
        },
      ],
      "vue/define-macros-order": [
        "error",
        {
          order: [
            "defineOptions",
            "defineProps",
            "defineEmits",
            "defineModel",
            "defineSlots",
          ],
          defineExposeLast: true,
        },
      ],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            component: "always",
            normal: "never",
            void: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
    },
  }
  //#endregion
);

export default config;
