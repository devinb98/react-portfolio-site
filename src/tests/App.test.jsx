import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, within } from '@testing-library/react'
import App from '../App'

// Integration tests: render the whole App (which owns the shared state) and
// drive it exactly like a user would. These prove the components are wired
// together correctly — the form updates the same list the search filters.
describe('App integration', () => {
  it('renders the header, form and seeded project list', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /personal project showcase app/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /add project/i })).toBeInTheDocument()
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
    expect(screen.getByText('Project 3')).toBeInTheDocument()
  })

  it('adds a new project through the form and shows it in the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Weather Dashboard')
    await user.type(
      screen.getByLabelText('Description'),
      'Live forecasts with charts',
    )
    await user.click(screen.getByRole('button', { name: /add/i }))

    // The new project now appears among the rendered projects.
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Live forecasts with charts')).toBeInTheDocument()
    // 3 seeds + 1 added = 4 rows.
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })

  it('filters the visible projects as the user types in search', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search Projects'), 'Project 2')

    expect(screen.getByText('Project 2')).toBeInTheDocument()
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Project 3')).not.toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })

  it('shows an empty state when the search matches nothing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search Projects'), 'nonexistent')

    expect(screen.getByText(/no projects found/i)).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('newly added projects are searchable', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add a project, then search for it specifically.
    await user.type(screen.getByLabelText('Title'), 'Recipe Finder')
    await user.type(screen.getByLabelText('Description'), 'search meals')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await user.type(screen.getByLabelText('Search Projects'), 'recipe')

    const list = screen.getAllByRole('article')
    expect(list).toHaveLength(1)
    expect(within(list[0]).getByText('Recipe Finder')).toBeInTheDocument()
  })
})
