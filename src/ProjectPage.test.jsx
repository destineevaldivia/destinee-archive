import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
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

test('clicking a project title opens that project page', () => {
  vi.useFakeTimers()
  renderAt('/')
  // Skip the splash: click it, then let the fade finish
  fireEvent.click(screen.getByRole('heading', { name: 'Destinee Archive' }))
  act(() => vi.advanceTimersByTime(500))
  vi.useRealTimers()

  fireEvent.click(screen.getByRole('link', { name: 'Film One 2026' }))

  expect(screen.getByRole('heading', { name: 'Film One 2026' })).toBeTruthy()
  expect(screen.queryByRole('heading', { name: 'Photo Two 2026' })).toBeNull()
})

test('an unknown project shows not found', () => {
  renderAt('/projects/typo')
  expect(screen.getByText('Project not found')).toBeTruthy()
})
