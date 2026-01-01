import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { Button } from './Button'

test('renders button with correct label', () => {
  render(<Button onClick={() => {}}>Next Step</Button>)
  const button = screen.getByText(/next step/i)

  expect(button).toBeInTheDocument()
})

test('calls onClick when clicked', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Next Step</Button>)

  const button = screen.getByText(/next step/i)
  fireEvent.click(button)

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('does not call onClick when disabled', () => {
  const handleClick = vi.fn()
  render(
    <Button onClick={handleClick} disabled={true}>
      Next Step
    </Button>,
  )

  const button = screen.getByText(/next step/i)
  fireEvent.click(button)

  expect(handleClick).not.toHaveBeenCalled()
})
