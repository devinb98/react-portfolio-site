import { describe, it, expect } from 'vitest'
import { renderWithTheme, screen } from './testUtils'
import ProjectList from '../components/ProjectList'

const sampleProjects = [
  { id: 'a', title: 'Alpha', description: 'first' },
  { id: 'b', title: 'Beta', description: 'second' },
]

// ProjectList is presentational — given a list it renders rows; given an empty
// list it shows the empty state. It never filters anything itself.
describe('ProjectList', () => {
  it('renders a row for every project it receives', () => {
    renderWithTheme(
      <ProjectList
        projects={sampleProjects}
        searchTerm=""
        onSearchChange={() => {}}
      />,
    )

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    // Each project renders inside its own <article> row.
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('shows an empty state when there are no projects', () => {
    renderWithTheme(
      <ProjectList projects={[]} searchTerm="xyz" onSearchChange={() => {}} />,
    )

    expect(screen.getByText(/no projects found/i)).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('always renders the search box', () => {
    renderWithTheme(
      <ProjectList projects={[]} searchTerm="" onSearchChange={() => {}} />,
    )
    expect(screen.getByLabelText('Search Projects')).toBeInTheDocument()
  })
})
