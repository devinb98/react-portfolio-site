import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Generated output — never lint the build or coverage folders.
  globalIgnores(['dist', 'coverage']),
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
  },
  {
    // Test files run under Vitest (node + jsdom), not the app's fast-refresh
    // pipeline, so the react-refresh rule doesn't apply. Expose Vitest globals.
    files: ['src/tests/**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.node, vi: 'readonly' },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
