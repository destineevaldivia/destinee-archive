import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import ProjectCarousel from './ProjectCarousel'

const images = ['/one.svg', '/two.svg', '/three.svg']

afterEach(cleanup)

function shownImage() {
  return screen.getByRole('button', { name: 'Next image' }).querySelector('img')
}

test('shows the first image to start', () => {
  render(<ProjectCarousel images={images} />)
  expect(shownImage().getAttribute('src')).toBe('/one.svg')
})

test('a click shows the next image', () => {
  render(<ProjectCarousel images={images} />)
  fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
  expect(shownImage().getAttribute('src')).toBe('/two.svg')
})

test('a click on the last image wraps to the first', () => {
  render(<ProjectCarousel images={images} />)
  const button = screen.getByRole('button', { name: 'Next image' })
  fireEvent.click(button)
  fireEvent.click(button)
  fireEvent.click(button)
  expect(shownImage().getAttribute('src')).toBe('/one.svg')
})

test('the counter shows which image is showing', () => {
  const { container } = render(<ProjectCarousel images={images} />)
  const counter = () => container.querySelector('.carousel-count').textContent

  expect(counter()).toBe('1/3')
  fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
  expect(counter()).toBe('2/3')
})

test('a single image is not clickable', () => {
  render(<ProjectCarousel images={['/one.svg']} />)
  expect(screen.queryByRole('button')).toBeNull()
})
