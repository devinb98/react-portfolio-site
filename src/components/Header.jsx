import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { miami } from '../styles/theme'

// Top banner from the mock: a full-width bar with the centered app title.
// Miami Vice treatment — a dark bar with a pink→cyan gradient title and a
// glowing neon underline. Presentational only; it holds no state.
export default function Header() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        // subtle vertical fade so the bar feels lit from within
        background: `linear-gradient(180deg, ${miami.surface} 0%, ${miami.bg} 100%)`,
        borderBottom: `2px solid ${miami.pink}`,
        boxShadow: `0 2px 24px rgba(255, 46, 136, 0.35)`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 1.5 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textAlign: 'center',
            // pink→cyan gradient clipped to the text glyphs
            background: `linear-gradient(90deg, ${miami.pink} 0%, ${miami.cyan} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 18px rgba(0, 229, 255, 0.35)',
          }}
        >
          Personal Project Showcase App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
