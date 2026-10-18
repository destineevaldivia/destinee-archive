import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App'

// jsdom has no real scrolling; App scrolls to top on every page change
vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

function renderAt(url) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}

function homeIsShowing() {
  return screen.queryByRole('link', { name: 'Film One 2026' }) !== null
}

test('arriving at home shows the splash first', () => {
  renderAt('/')
  expect(screen.getByRole('heading', { name: 'Destinee Archive' })).toBeTruthy()
  expect(homeIsShowing()).toBe(false)
})

test('the splash hands over to home after its time is up', () => {
  renderAt('/')
  act(() => vi.advanceTimersByTime(2500)) // title shown, fade starts
  expect(homeIsShowing()).toBe(false)
  act(() => vi.advanceTimersByTime(500)) // fade done
  expect(homeIsShowing()).toBe(true)
})

test('clicking the splash skips it', () => {
  renderAt('/')
  fireEvent.click(screen.getByRole('heading', { name: 'Destinee Archive' }))
  act(() => vi.advanceTimersByTime(500))
  expect(homeIsShowing()).toBe(true)
})

test('arriving at a project page skips the splash', () => {
  renderAt('/projects/film-one')
  expect(screen.getByRole('heading', { name: 'Film One 2026' })).toBeTruthy()
})
