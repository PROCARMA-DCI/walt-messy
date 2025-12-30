import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // allow `any` type
      "@typescript-eslint/no-unused-vars": "off", // allow unused variables
      "no-unused-vars": "off", // base rule (for JS)
      "no-console": "off", // allow console.log
      "no-empty-function": "off", // allow empty functions
      "@typescript-eslint/no-empty-function": "off",
      /* ⚙️ React hook dependencies (disable noisy warnings) */
      "react-hooks/exhaustive-deps": "off",

      /* ⚙️ Allow @ts-ignore */
      "@typescript-eslint/ban-ts-comment": "off",

      /* ⚙️ Allow any type freely */
      "@typescript-eslint/no-explicit-any": "off",

      /* ⚙️ Make unused vars warnings only (not errors) */
      "@typescript-eslint/no-unused-vars": "warn",

      /* ⚙️ Allow normal <img> tags */
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
