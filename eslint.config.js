import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'scratch']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(React|_)',
          ignoreRestSiblings: true,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // The serverless functions in `api/` and the Vite config run in Node, not
    // the browser. Without this they fail `no-undef` on `process`, which looks
    // like a bug in the code rather than a lint configuration gap.
    files: ['api/**/*.js', 'vite.config.js', 'vitest.config.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // Test files export helpers alongside components and are never part of a
    // Fast Refresh boundary, so that rule does not apply to them.
    files: ['**/*.test.{js,jsx}', 'src/test/**/*.js'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
