import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepActions } from '../StepActions'

describe('StepActions', () => {
  it('renders "Go Back" button when onBack is provided', () => {
    render(<StepActions onBack={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument()
  })

  it('does not render "Go Back" button when onBack is not provided', () => {
    render(<StepActions />)
    expect(
      screen.queryByRole('button', { name: 'Go Back' }),
    ).not.toBeInTheDocument()
  })

  it('renders "Next Step" button by default', () => {
    render(<StepActions />)
    expect(
      screen.getByRole('button', { name: 'Next Step' }),
    ).toBeInTheDocument()
  })

  it('uses custom back label', () => {
    render(<StepActions onBack={vi.fn()} backLabel="Previous" />)
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
  })

  it('uses custom next label', () => {
    render(<StepActions nextLabel="Continue" />)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })

  it('renders children instead of default Next button when provided', () => {
    render(
      <StepActions>
        <button>Custom Action</button>
      </StepActions>,
    )

    expect(
      screen.getByRole('button', { name: 'Custom Action' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Next Step' }),
    ).not.toBeInTheDocument()
  })

  it('applies form attribute from formId to the Next button', () => {
    render(<StepActions formId="my-form" />)
    expect(screen.getByRole('button', { name: 'Next Step' })).toHaveAttribute(
      'form',
      'my-form',
    )
  })

  it('renders both back button and next button when onBack is provided', () => {
    render(<StepActions onBack={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Next Step' }),
    ).toBeInTheDocument()
  })
})
