import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from './testUtils'
import SearchBar from '../components/SearchBar'

// SearchBar is a controlled component: it shows the `value` prop and reports
// changes up via `onChange`. These tests verify both directions.
describe('SearchBar', () => {
  it('displays the value it is given', () => {
    renderWithTheme(<SearchBar value="hello" onChange={() => {}} />)
    expect(screen.getByLabelText('Search Projects')).toHaveValue('hello')
  })

  it('reports each keystroke to onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    renderWithTheme(<SearchBar value="" onChange={handleChange} />)

    await user.type(screen.getByLabelText('Search Projects'), 'abc')

    // One call per character typed.
    expect(handleChange).toHaveBeenCalledTimes(3)
    expect(handleChange).toHaveBeenNthCalledWith(1, 'a')
    expect(handleChange).toHaveBeenNthCalledWith(2, 'b')
    expect(handleChange).toHaveBeenNthCalledWith(3, 'c')
  })
})
