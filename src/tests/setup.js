// Global test setup, run once before each test file (see vite.config.js).
// Adds jest-dom's custom matchers (e.g. toBeInTheDocument) to expect(),
// and clears the rendered DOM between tests to keep them isolated.
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
