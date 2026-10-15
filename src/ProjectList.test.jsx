import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import ProjectList from './ProjectList'
import projects from './projects'

test('renders a row for each project', () => {
  render(<ProjectList projects={projects} />)

  for (const project of projects) {
    const heading = `${project.title} ${project.year}`
    expect(screen.getByRole('heading', { name: heading })).toBeTruthy()
  }
})
