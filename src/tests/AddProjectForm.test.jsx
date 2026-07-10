import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from './testUtils'
import AddProjectForm from '../components/AddProjectForm'

// Interaction tests for the form. userEvent simulates real typing/clicking so
// we exercise the component the way a person would.
describe('AddProjectForm', () => {
  it('renders the title, description and add button', () => {
    renderWithTheme(<AddProjectForm onAddProject={() => {}} />)

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('calls onAddProject with the entered values when submitted', async () => {
    const user = userEvent.setup()
    const handleAdd = vi.fn()
    renderWithTheme(<AddProjectForm onAddProject={handleAdd} />)

    await user.type(screen.getByLabelText('Title'), 'My Portfolio')
    await user.type(screen.getByLabelText('Description'), 'A neat site')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(handleAdd).toHaveBeenCalledTimes(1)
    expect(handleAdd).toHaveBeenCalledWith({
      title: 'My Portfolio',
      description: 'A neat site',
    })
  })

  it('clears the inputs after a successful submit', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AddProjectForm onAddProject={() => {}} />)

    const title = screen.getByLabelText('Title')
    const description = screen.getByLabelText('Description')

    await user.type(title, 'Temp')
    await user.type(description, 'Temp desc')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(title).toHaveValue('')
    expect(description).toHaveValue('')
  })

  it('does not submit and shows an error when the title is empty', async () => {
    const user = userEvent.setup()
    const handleAdd = vi.fn()
    renderWithTheme(<AddProjectForm onAddProject={handleAdd} />)

    // Only fill description; leave the required title blank.
    await user.type(screen.getByLabelText('Description'), 'no title here')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(handleAdd).not.toHaveBeenCalled()
    expect(screen.getByText('Title is required')).toBeInTheDocument()
  })
})
