import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button, SubmitButton } from '../Button'
import { renderWithFormContext } from '@/test-utils'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-blue-950')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-purple-600')
  })

  it('applies additional variant', () => {
    render(<Button variant="additional">Back</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('text-grey-500')
  })

  it('passes additional className', () => {
    render(<Button className="extra-class">Styled</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('extra-class')
  })

  it('renders as a button element', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button').tagName).toBe('BUTTON')
  })

  it('forwards additional props', () => {
    render(<Button data-testid="test-btn">Test</Button>)
    expect(screen.getByTestId('test-btn')).toBeInTheDocument()
  })
})

describe('SubmitButton', () => {
  it('renders children within form context', () => {
    renderWithFormContext(<SubmitButton>Submit</SubmitButton>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('has type submit', () => {
    renderWithFormContext(<SubmitButton>Submit</SubmitButton>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('renders with primary variant by default', () => {
    renderWithFormContext(<SubmitButton>Submit</SubmitButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-blue-950')
  })

  it('renders with secondary variant when specified', () => {
    renderWithFormContext(
      <SubmitButton variant="secondary">Confirm</SubmitButton>,
    )
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-purple-600')
  })

  it('forwards additional props', () => {
    renderWithFormContext(
      <SubmitButton data-testid="submit-btn">Go</SubmitButton>,
    )
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
  })
})
