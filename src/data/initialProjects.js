// Seed data so the landing page shows content on first load, mirroring the
// three sample rows in the design mock. In a real app this would come from an
// API; here it lives in one place so it is easy to swap out later.
const initialProjects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of the project',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description of the project',
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Description of the project',
  },
]

export default initialProjects
