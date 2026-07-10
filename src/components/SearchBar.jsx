import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

// The "Search Projects" input at the top of the list card.
//
// This is a fully CONTROLLED component: it renders whatever `value` the parent
// gives it and reports every keystroke back through `onChange`. It holds no
// state of its own, so the single source of truth for the search term lives in
// the parent alongside the project list it filters.
export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      placeholder="Search Projects"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
      slotProps={{
        htmlInput: { 'aria-label': 'Search Projects' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
