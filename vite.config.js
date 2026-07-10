import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest configuration. Vitest reuses this Vite config, so the same
  // transforms/aliases apply to tests as to the app.
  test: {
    globals: true, // expose describe/it/expect without importing them
    environment: 'jsdom', // provide a browser-like DOM for React Testing Library
    setupFiles: './src/tests/setup.js', // runs before each test file
    css: true, // let MUI's emotion styles resolve during tests
  },
})
