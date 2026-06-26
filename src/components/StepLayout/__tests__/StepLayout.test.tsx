import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepLayout } from '../StepLayout'

describe('StepLayout', () => {
  it('renders the title and description', () => {
    render(
      <StepLayout
        title="Personal info"
        description="Please provide your details."
      >
        <div>Content</div>
      </StepLayout>,
    )

    expect(screen.getByText('Personal info')).toBeInTheDocument()
    expect(screen.getByText('Please provide your details.')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <StepLayout title="Title" description="Desc">
        <div data-testid="child">Child content</div>
      </StepLayout>,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    render(
      <StepLayout
        title="Title"
        description="Desc"
        actions={<button>Next</button>}
      >
        <div>Content</div>
      </StepLayout>,
    )

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('does not render actions section when actions not provided', () => {
    const { container } = render(
      <StepLayout title="Title" description="Desc">
        <div>Content</div>
      </StepLayout>,
    )

    const allButtons = container.querySelectorAll('button')
    expect(allButtons).toHaveLength(0)
  })
})
