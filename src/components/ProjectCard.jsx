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
      {/* Thumbnail placeholder — a bordered square with a neutral image icon */}
      <Box
        sx={{
          width: 72,
          height: 72,
          flexShrink: 0,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f0f0f0',
        }}
      >
        <ImageOutlinedIcon sx={{ color: 'text.secondary' }} />
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
