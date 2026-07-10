import { createTheme } from '@mui/material/styles'

// Central Material UI theme. Keeping design tokens (colors, shape, typography)
// in one place makes the look easy to maintain — a requirement of the brief.
// The palette stays close to the clean, neutral wireframe: light grey surfaces,
// dark text, and a single accent color for the primary action.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1f2933' }, // near-black, matches the mock's bold headings
    background: {
      default: '#ffffff',
      paper: '#fafafa', // the subtle grey card fill from the wireframe
    },
    text: {
      primary: '#1f2933',
      secondary: '#52606d',
    },
  },
  shape: {
    borderRadius: 10, // rounded card/input corners like the mock
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.6rem', fontWeight: 700 },
  },
  components: {
    // Give every Paper card a visible 1px border like the wireframe outlines.
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #d0d5dd',
        },
      },
    },
  },
})

export default theme
