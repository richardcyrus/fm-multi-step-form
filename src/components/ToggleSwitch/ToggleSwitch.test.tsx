import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { ToggleSwitch } from './ToggleSwitch'

describe('ToggleSwitch Component', () => {
  describe('Rendering', () => {
    test('renders toggle switch with left and right labels', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      expect(screen.getByText('Monthly')).toBeInTheDocument()
      expect(screen.getByText('Yearly')).toBeInTheDocument()
    })

    test('renders checkbox input element', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toHaveAttribute('type', 'checkbox')
      expect(checkbox).toHaveAttribute('id', 'toggle-switch')
    })

    test.skip('renders container with correct styling classes', () => {
      const { container } = render(
        <ToggleSwitch leftLabel="A" rightLabel="B" />,
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass(
        'group',
        'flex',
        'min-h-12',
        'min-w-73.75',
        'items-center',
        'justify-center',
        'gap-6',
        'rounded-lg',
        'bg-blue-50',
      )
    })

    test.skip('renders switch thumb element', () => {
      const { container } = render(
        <ToggleSwitch leftLabel="On" rightLabel="Off" />,
      )

      const switchThumb = container.querySelector(
        'label[for="toggle-switch"]:not(:first-child):not(:last-child)',
      )
      expect(switchThumb).toBeInTheDocument()
      expect(switchThumb).toHaveClass(
        'absolute',
        'top-1',
        'left-1',
        'h-3',
        'w-3',
        'cursor-pointer',
        'rounded-full',
        'border',
        'border-blue-950',
        'bg-white',
        'shadow-sm',
        'transition-transform',
        'duration-300',
      )
    })
  })

  describe('Toggle Functionality', () => {
    test('toggles state when clicked', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    test('toggles state when label is clicked', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      const leftLabel = screen.getByText('Monthly')

      expect(checkbox).not.toBeChecked()

      fireEvent.click(leftLabel)
      expect(checkbox).toBeChecked()
    })

    test('calls onChange handler when toggled', () => {
      const handleChange = vi.fn()
      render(
        <ToggleSwitch
          leftLabel="On"
          rightLabel="Off"
          onChange={handleChange}
        />,
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test.skip('does not toggle when disabled', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" disabled={true} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('Input Props', () => {
    test('accepts and spreads additional input props', () => {
      render(
        <ToggleSwitch
          leftLabel="On"
          rightLabel="Off"
          name="toggle"
          value="switch-value"
          data-testid="custom-toggle"
        />,
      )

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('name', 'toggle')
      expect(checkbox).toHaveAttribute('value', 'switch-value')
      expect(checkbox).toHaveAttribute('data-testid', 'custom-toggle')
    })

    test('respects checked prop', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" checked />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    test('respects defaultChecked prop', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" defaultChecked />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    test('applies aria attributes', () => {
      render(
        <ToggleSwitch
          leftLabel="On"
          rightLabel="Off"
          aria-label="Toggle switch for subscription"
          aria-describedby="toggle-description"
        />,
      )

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute(
        'aria-label',
        'Toggle switch for subscription',
      )
      expect(checkbox).toHaveAttribute('aria-describedby', 'toggle-description')
    })
  })

  describe.skip('Styling Classes', () => {
    test('applies correct classes to checkbox input', () => {
      const { container } = render(
        <ToggleSwitch leftLabel="A" rightLabel="B" />,
      )

      const checkbox = container.querySelector('input[type="checkbox"]')
      expect(checkbox).toHaveClass(
        'peer',
        'h-5',
        'w-9.5',
        'cursor-pointer',
        'appearance-none',
        'rounded-full',
        'bg-blue-950',
        'transition-colors',
        'duration-300',
        'checked:bg-blue-950',
      )
    })

    test('applies correct classes to labels', () => {
      const { container } = render(
        <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      )

      const labels = container.querySelectorAll('label[for="toggle-switch"]')
      expect(labels[0]).toHaveClass(
        'cursor-pointer',
        'text-sm',
        'font-medium',
        'text-blue-950',
        'group-has-checked:text-grey-500',
      )
      expect(labels[2]).toHaveClass(
        'cursor-pointer',
        'text-sm',
        'font-medium',
        'text-grey-500',
        'group-has-checked:text-blue-950',
      )
    })

    test('switch thumb has peer-checked classes', () => {
      const { container } = render(
        <ToggleSwitch leftLabel="A" rightLabel="B" />,
      )

      const switchThumb = container.querySelector(
        'label[for="toggle-switch"]:not(:first-child):not(:last-child)',
      )
      expect(switchThumb).toHaveClass(
        'peer-checked:translate-x-4',
        'peer-checked:border-blue-950',
      )
    })
  })

  describe('Accessibility', () => {
    test.skip('is keyboard accessible', () => {
      const handleChange = vi.fn()
      render(
        <ToggleSwitch
          leftLabel="On"
          rightLabel="Off"
          onChange={handleChange}
        />,
      )

      const checkbox = screen.getByRole('checkbox')

      // Test Enter key
      fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter' })
      expect(handleChange).toHaveBeenCalledTimes(1)

      // Test Space key
      fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' })
      expect(handleChange).toHaveBeenCalledTimes(2)
    })

    test('labels are properly associated with input', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      const labels = screen.getAllByText(/Monthly|Yearly/)

      labels.forEach((label) => {
        expect(label).toHaveAttribute('for', 'toggle-switch')
      })
    })

    test('can be found by role and name', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    test('disabled state is properly communicated', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" disabled />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()
      expect(checkbox).toHaveAttribute('disabled')
    })
  })

  describe('Edge Cases', () => {
    test('renders with empty labels', () => {
      render(<ToggleSwitch leftLabel="" rightLabel="" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    test('handles long labels', () => {
      const longLeftLabel =
        'Very long left label that might cause layout issues'
      const longRightLabel =
        'Very long right label that might cause layout issues'

      render(
        <ToggleSwitch leftLabel={longLeftLabel} rightLabel={longRightLabel} />,
      )

      expect(screen.getByText(longLeftLabel)).toBeInTheDocument()
      expect(screen.getByText(longRightLabel)).toBeInTheDocument()
    })

    test('works with ref forwarding', () => {
      const ref = { current: null }
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" ref={ref} />)

      const checkbox = screen.getByRole('checkbox')
      expect(ref.current).toBe(checkbox)
    })
  })
})
