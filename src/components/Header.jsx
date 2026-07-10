import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// Top banner from the mock: a full-width bar with the centered app title.
// Presentational only — it holds no state.
export default function Header() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f5f5f5' }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
          Personal Project Showcase App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
