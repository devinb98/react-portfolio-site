import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'

// Shared render helper for component tests. Individual components (unlike App)
// don't include their own ThemeProvider, so we wrap them here to render them
// exactly as they appear inside the real app. Re-exporting everything from RTL
// lets test files import screen/fireEvent/etc. from this one module.
export function renderWithTheme(ui, options) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options)
}

export * from '@testing-library/react'
