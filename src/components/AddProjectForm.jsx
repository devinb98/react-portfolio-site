import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// "Add Project" card from the mock: a Title field, a multiline Description
// field, and an Add button.
//
// This component keeps its OWN local state for the two inputs (the classic
// "controlled form" pattern) because no other component needs the in-progress
// text. When the form is submitted it hands the finished project up to the
// parent via the onAddProject callback, so the shared list state stays at the
// top of the tree.
export default function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // keep the SPA from doing a full page reload

    // Title is required; description is optional to keep the form forgiving.
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    onAddProject({ title, description })

    // Reset the form for the next entry.
    setTitle('')
    setDescription('')
    setError('')
  }

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          color: 'secondary.main',
          textShadow: '0 0 14px rgba(0, 229, 255, 0.45)',
        }}
      >
        Add Project
      </Typography>

      {/* noValidate lets us handle validation ourselves for a consistent message */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            slotProps={{ htmlInput: { 'aria-label': 'Title' } }}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            fullWidth
            slotProps={{ htmlInput: { 'aria-label': 'Description' } }}
          />

          <Box>
            <Button type="submit" variant="outlined" size="large">
              Add
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}
