import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

// A single project row: a square thumbnail placeholder on the left (the "X"
// box in the mock) and the title + description on the right.
// Presentational — it just renders the project it is given.
export default function ProjectCard({ project }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      component="article"
      sx={{ py: 1.5 }}
    >
      {/* Thumbnail placeholder — a neon pink→cyan gradient tile with a glow */}
      <Box
        sx={{
          width: 72,
          height: 72,
          flexShrink: 0,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgba(255,46,136,0.25) 0%, rgba(0,229,255,0.25) 100%)',
          border: '1px solid rgba(0,229,255,0.4)',
          boxShadow: '0 0 12px rgba(255,46,136,0.25)',
        }}
      >
        <ImageOutlinedIcon sx={{ color: 'secondary.main' }} />
      </Box>

      <Box>
        <Typography variant="h6" component="h3">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </Box>
    </Stack>
  )
}
