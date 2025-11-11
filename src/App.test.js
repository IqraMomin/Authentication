import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

test('renders hello world', () => {
  render(
    <MemoryRouter><App /></MemoryRouter>
  )
  const helloWorldElement = screen.getByText(/hello world/i)
  expect(helloWorldElement).toBeInTheDocument()
})
