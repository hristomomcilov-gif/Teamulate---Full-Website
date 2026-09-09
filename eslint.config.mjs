import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const SITECHROME_DOC = "docs/LOCKED_SITECHROME.md";

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

  // LOCKED SITECHROME: the header and footer exist once, rendered by SiteChrome
  // from the root layout. Pages and other components may not import them or
  // build their own. (src/components/demo is the protected product recreation.)
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/SiteChrome.tsx", "src/tests/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/SiteHeader", "**/SiteFooter"],
              message: `Shared chrome is rendered only by SiteChrome in the root layout. See ${SITECHROME_DOC}.`,
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/**/*.tsx", "src/components/**/*.tsx"],
    ignores: ["src/components/SiteHeader.tsx", "src/components/SiteFooter.tsx", "src/components/demo/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='header']",
          message: `Page-local <header> is forbidden: every marketing page inherits SiteHeader via SiteChrome. See ${SITECHROME_DOC}.`,
        },
        {
          selector: "JSXOpeningElement[name.name='footer']",
          message: `Page-local <footer> is forbidden: every marketing page inherits SiteFooter via SiteChrome. See ${SITECHROME_DOC}.`,
        },
        {
          selector: "JSXAttribute[name.name='aria-label'][value.value='Main']",
          message: `A second main nav is forbidden: the header nav lives in SiteHeader only. See ${SITECHROME_DOC}.`,
        },
      ],
    },
  },
]);

export default eslintConfig;
