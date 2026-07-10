import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useProjects from '../hooks/useProjects'

// Unit tests for the data layer. Testing the hook directly (via renderHook)
// lets us verify the add/filter rules without rendering any UI.
describe('useProjects', () => {
  it('starts with the three seed projects', () => {
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toHaveLength(3)
    expect(result.current.filteredProjects).toHaveLength(3)
  })

  it('adds a new project to the top of the list', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.addProject({ title: 'New App', description: 'Cool thing' })
    })

    expect(result.current.projects).toHaveLength(4)
    expect(result.current.projects[0]).toMatchObject({
      title: 'New App',
      description: 'Cool thing',
    })
    // Every project needs a unique id for stable React keys.
    const ids = result.current.projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('trims whitespace from title and description on add', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.addProject({ title: '  Spaced  ', description: '  hi  ' })
    })

    expect(result.current.projects[0]).toMatchObject({
      title: 'Spaced',
      description: 'hi',
    })
  })

  it('filters projects by title, case-insensitively', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.setSearchTerm('PROJECT 2')
    })

    expect(result.current.filteredProjects).toHaveLength(1)
    expect(result.current.filteredProjects[0].title).toBe('Project 2')
  })

  it('filters projects by description text too', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.addProject({ title: 'Alpha', description: 'uses GraphQL' })
      result.current.setSearchTerm('graphql')
    })

    expect(result.current.filteredProjects).toHaveLength(1)
    expect(result.current.filteredProjects[0].title).toBe('Alpha')
  })

  it('returns an empty list when nothing matches', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.setSearchTerm('zzz-no-match')
    })

    expect(result.current.filteredProjects).toHaveLength(0)
    // The underlying data is untouched — search only filters the view.
    expect(result.current.projects).toHaveLength(3)
  })
})
