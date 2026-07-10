import { createTheme } from '@mui/material/styles'

// Central Material UI theme — "Miami Vice" edition.
//
// Keeping all design tokens in one place makes the look easy to maintain (a
// requirement of the brief). The palette leans into the 80s Miami Vice
// aesthetic: a deep midnight background with neon PINK and CYAN accents, and a
// touch of glow. Swapping these few values retints the whole app.
export const miami = {
  pink: '#ff2e88', // neon magenta — primary accent / actions
  pinkSoft: '#ff6ab5',
  cyan: '#00e5ff', // electric cyan — secondary accent
  cyanSoft: '#68f0ff',
  bg: '#0d0221', // near-black midnight purple
  surface: '#1a0f2e', // slightly lifted panel color for cards
  border: 'rgba(0, 229, 255, 0.35)', // faint cyan hairline on panels
  text: '#f4ecff',
  textDim: '#b9a6d9',
}

const theme = createTheme({
  palette: {
    mode: 'dark', // dark surfaces, light text — the foundation of the look
    primary: { main: miami.pink },
    secondary: { main: miami.cyan },
    background: {
      default: miami.bg,
      paper: miami.surface,
    },
    text: {
      primary: miami.text,
      secondary: miami.textDim,
    },
    divider: miami.border,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 800, letterSpacing: '0.02em' },
    h2: { fontSize: '1.6rem', fontWeight: 700 },
  },
  components: {
    // Cards get a cyan hairline border plus a soft neon glow so they read as
    // lit panels against the dark background.
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${miami.border}`,
          boxShadow: '0 0 24px rgba(255, 46, 136, 0.12)',
          backgroundImage: 'none',
        },
      },
    },
    // The primary action button glows pink on hover.
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
  },
})

export default theme
