import { useMemo, useState } from 'react'
import initialProjects from '../data/initialProjects'

// Custom hook that owns all project-related state and logic.
//
// Extracting this into a hook keeps App.jsx focused on layout while the data
// rules (how projects are added, how the search filters them) live in one
// testable place. The state itself still lives at the top of the component
// tree (App), satisfying the brief's "state at the nearest common parent" rule,
// because App is the single component that calls this hook.
export default function useProjects() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')

  // Add a new project to the top of the list. crypto.randomUUID() gives each
  // project a stable, unique React key even if two projects share a title.
  function addProject({ title, description }) {
    const newProject = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
    }
    setProjects((prev) => [newProject, ...prev])
  }

  // Case-insensitive filter over title AND description. useMemo avoids
  // recomputing the filtered array unless the inputs actually change.
  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return projects
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term),
    )
  }, [projects, searchTerm])

  return {
    projects,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    addProject,
  }
}
