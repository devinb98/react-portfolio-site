import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'
import AddProjectForm from './components/AddProjectForm'
import ProjectList from './components/ProjectList'
import useProjects from './hooks/useProjects'
import theme from './styles/theme'

// App is the top-level component and the single owner of shared state.
//
// It calls useProjects() here — at the nearest common ancestor of every
// component that needs the data — so the project list and search term flow
// DOWN as props and changes flow UP through callbacks. AddProjectForm and
// ProjectList never talk to each other directly; App is the hub.
function App() {
  const { filteredProjects, searchTerm, setSearchTerm, addProject } =
    useProjects()

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes browser default styles across devices */}
      <CssBaseline />
      <Header />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Adding a project bubbles up to the shared state via addProject */}
          <AddProjectForm onAddProject={addProject} />

          {/* The list receives the already-filtered projects + search wiring */}
          <ProjectList
            projects={filteredProjects}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
