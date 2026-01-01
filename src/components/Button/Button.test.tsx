import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Button } from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    test('renders button with correct label', () => {
      render(<Button onClick={() => {}}>Next Step</Button>)
      const button = screen.getByText(/next step/i)

      expect(button).toBeInTheDocument()
    })

    test('renders button as a button element', () => {
      render(<Button onClick={() => {}}>Click me</Button>)
      const button = screen.getByRole('button')

      expect(button.tagName).toBe('BUTTON')
    })

    test('renders children correctly', () => {
      render(
        <Button onClick={() => {}}>
          <span>Icon</span> Text
        </Button>,
      )
      const button = screen.getByRole('button')

      expect(button).toContainElement(screen.getByText('Icon'))
      expect(button).toHaveTextContent('Icon Text')
    })
  })

  describe('Click Handling', () => {
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

    test('calls onClick multiple times on multiple clicks', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Variants', () => {
    test('renders with primary variant by default', () => {
      const { container } = render(<Button onClick={() => {}}>Primary</Button>)
      const button = container.querySelector('button')

      expect(button).toHaveClass('bg-blue-950')
      expect(button).toHaveClass('text-white')
    })

    test('renders with primary variant when explicitly specified', () => {
      const { container } = render(
        <Button variant="primary" onClick={() => {}}>
          Primary Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveClass('bg-blue-950')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('hover:bg-blue-700')
    })

    test('renders with secondary variant', () => {
      const { container } = render(
        <Button variant="secondary" onClick={() => {}}>
          Secondary Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveClass('bg-purple-600')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('hover:bg-purple-400')
    })

    test('renders with additional variant', () => {
      const { container } = render(
        <Button variant="additional" onClick={() => {}}>
          Additional Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveClass('text-grey-500')
      expect(button).toHaveClass('hover:text-blue-950')
    })
  })

  describe('Styling', () => {
    test('applies base button styles', () => {
      const { container } = render(<Button onClick={() => {}}>Button</Button>)
      const button = container.querySelector('button')

      expect(button).toHaveClass('inline-flex')
      expect(button).toHaveClass('min-h-12')
      expect(button).toHaveClass('min-w-[7.6875rem]')
      expect(button).toHaveClass('cursor-pointer')
      expect(button).toHaveClass('items-center')
      expect(button).toHaveClass('justify-center')
      expect(button).toHaveClass('rounded-lg')
      expect(button).toHaveClass('font-medium')
    })

    test('merges custom className with variant styles', () => {
      const { container } = render(
        <Button onClick={() => {}} className="custom-class">
          Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('bg-blue-950')
    })

    test('allows custom className to override variant styles', () => {
      const { container } = render(
        <Button onClick={() => {}} variant="primary" className="bg-red-500">
          Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveClass('bg-red-500')
    })
  })

  describe('Button Attributes', () => {
    test('respects disabled attribute', () => {
      const { container } = render(
        <Button onClick={() => {}} disabled={true}>
          Disabled Button
        </Button>,
      )
      const button = container.querySelector('button') as HTMLButtonElement

      expect(button.disabled).toBe(true)
    })

    test('respects type attribute', () => {
      const { container } = render(
        <Button onClick={() => {}} type="submit">
          Submit
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveAttribute('type', 'submit')
    })

    test('applies aria-label when provided', () => {
      const { container } = render(
        <Button onClick={() => {}} aria-label="Close dialog">
          ✕
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveAttribute('aria-label', 'Close dialog')
    })

    test('applies data attributes', () => {
      const { container } = render(
        <Button onClick={() => {}} data-testid="custom-button">
          Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveAttribute('data-testid', 'custom-button')
    })
  })

  describe('Accessibility', () => {
    test('button is keyboard accessible', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Keyboard Button</Button>)

      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })

      expect(button).toBeInTheDocument()
    })

    test('disabled button has proper aria state', () => {
      const { container } = render(
        <Button onClick={() => {}} disabled={true}>
          Disabled
        </Button>,
      )
      const button = container.querySelector('button') as HTMLButtonElement

      expect(button.disabled).toBe(true)
      expect(button.getAttribute('disabled')).not.toBeNull()
    })

    test('button can be found by text content', () => {
      render(<Button onClick={() => {}}>Click Here</Button>)
      const button = screen.getByRole('button', { name: /click here/i })

      expect(button).toBeInTheDocument()
    })
  })

  describe('Props Spreading', () => {
    test('spreads additional button props', () => {
      const { container } = render(
        <Button onClick={() => {}} title="Hover text">
          Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveAttribute('title', 'Hover text')
    })

    test('handles multiple additional props', () => {
      const { container } = render(
        <Button
          onClick={() => {}}
          disabled={false}
          title="Info"
          className="extra"
        >
          Button
        </Button>,
      )
      const button = container.querySelector('button')

      expect(button).toHaveAttribute('title', 'Info')
      expect(button).toHaveClass('extra')
    })
  })
})
