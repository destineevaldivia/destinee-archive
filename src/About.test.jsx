import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, test, vi } from 'vitest'
import App from './App'

// jsdom has no real scrolling; App scrolls to top on every page change
vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

afterEach(cleanup)

function renderAt(url) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}

test('the About nav link opens the about page', () => {
  // Start on a project page so the splash doesn't play
  renderAt('/projects/film-one')
  fireEvent.click(screen.getByRole('link', { name: 'About' }))

  expect(screen.getByRole('link', { name: 'Instagram' }).getAttribute('href'))
    .toBe('https://www.instagram.com/dustyknees_/')
  expect(screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href'))
    .toBe('https://www.linkedin.com/in/destinee-valdivia/')
  expect(screen.getByRole('link', { name: 'Are.na' }).getAttribute('href'))
    .toBe('https://www.are.na/destinee-valdivia')
})

test('the nav marks About as the current page', () => {
  renderAt('/about')
  const nav = (name) => screen.getByRole('link', { name })

  expect(nav('About').getAttribute('aria-current')).toBe('page')
  expect(nav('Home').getAttribute('aria-current')).toBeNull()
})

test('clicking the email copies it and says copied', async () => {
  const writeText = vi.fn().mockResolvedValue()
  Object.assign(navigator, { clipboard: { writeText } })

  renderAt('/about')
  fireEvent.click(screen.getByRole('button', { name: 'destvaldivia@gmail.com' }))

  expect(writeText).toHaveBeenCalledWith('destvaldivia@gmail.com')
  expect(await screen.findByText('Copied')).toBeTruthy()
})
