import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ProjectCard from './ProjectCard'
import SearchBar from './SearchBar'

// The lower card from the mock: a search box pinned to the top, followed by the
// list of matching projects.
//
// This is a "container of presentational children" but still stateless itself —
// it receives the already-filtered list plus the search value/handler from the
// parent and simply lays them out. Keeping it dumb makes it trivial to test.
export default function ProjectList({ projects, searchTerm, onSearchChange }) {
  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <SearchBar value={searchTerm} onChange={onSearchChange} />

      <Divider sx={{ mt: 2, mb: 1 }} />

      {projects.length === 0 ? (
        // Friendly empty state when a search matches nothing.
        <Typography
          color="text.secondary"
          sx={{ py: 3, textAlign: 'center' }}
          role="status"
        >
          No projects found.
        </Typography>
      ) : (
        <Stack divider={<Divider flexItem />}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      )}
    </Paper>
  )
}
