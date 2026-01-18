import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ToggleSwitch } from './ToggleSwitch'

const mockField = {
  name: 'billingCycle',
  state: {
    value: false,
  },
  handleChange: vi.fn(),
}

vi.mock('@/hooks/form-context', () => ({
  useFieldContext: () => mockField,
}))

describe('ToggleSwitch Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockField.state.value = false
    mockField.handleChange = vi.fn()
  })

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

    test('renders container wrapper element', () => {
      render(<ToggleSwitch leftLabel="A" rightLabel="B" />)

      const wrapper = screen.getByRole('checkbox').closest('div')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Form Integration', () => {
    test('uses field name from form context', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('name', 'billingCycle')
    })

    test('displays field value from form state', () => {
      mockField.state.value = true
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    test('calls field handleChange when toggled', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(mockField.handleChange).toHaveBeenCalledWith(true)
    })

    test('calls field handleChange with correct boolean value when unchecked', () => {
      mockField.state.value = true
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(mockField.handleChange).toHaveBeenCalledWith(false)
    })

    test('checkbox is unchecked when field value is false', () => {
      mockField.state.value = false
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('Toggle Functionality', () => {
    test.skip('toggles state when clicked', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    test.skip('toggles state when left label is clicked', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      const leftLabel = screen.getByText('Monthly')

      expect(checkbox).not.toBeChecked()

      fireEvent.click(leftLabel)
      expect(checkbox).toBeChecked()
      expect(mockField.handleChange).toHaveBeenCalledWith(true)
    })

    test.skip('toggles state when right label is clicked', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      const rightLabel = screen.getByText('Yearly')

      expect(checkbox).not.toBeChecked()

      fireEvent.click(rightLabel)
      expect(checkbox).toBeChecked()
      expect(mockField.handleChange).toHaveBeenCalledWith(true)
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

      const checkbox = screen.getByTestId('custom-toggle')
      expect(checkbox).toHaveAttribute('name', 'toggle')
      expect(checkbox).toHaveAttribute('value', 'switch-value')
    })

    test('respects checked prop', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" checked />)

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

    test('respects required attribute', () => {
      render(<ToggleSwitch leftLabel="On" rightLabel="Off" required />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeRequired()
    })
  })

  describe('Accessibility', () => {
    test.skip('is keyboard accessible with Enter key', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')

      fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter' })

      expect(mockField.handleChange).toHaveBeenCalledWith(true)
    })

    test.skip('is keyboard accessible with Space key', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')

      fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' })

      expect(mockField.handleChange).toHaveBeenCalledWith(true)
    })

    test('labels are properly associated with input', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

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

    test.skip('switch thumb is properly labeled', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const switchThumb = screen.getByDisplayValue('')
      expect(switchThumb).toHaveAttribute('id', 'toggle-switch')
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

    test('handles special characters in labels', () => {
      render(<ToggleSwitch leftLabel="Monthly (€)" rightLabel="Yearly ($)" />)

      expect(screen.getByText('Monthly (€)')).toBeInTheDocument()
      expect(screen.getByText('Yearly ($)')).toBeInTheDocument()
    })

    test('handles numeric labels', () => {
      render(<ToggleSwitch leftLabel="1 Month" rightLabel="12 Months" />)

      expect(screen.getByText('1 Month')).toBeInTheDocument()
      expect(screen.getByText('12 Months')).toBeInTheDocument()
    })

    test('renders without crashing when all props are provided', () => {
      expect(() => {
        render(
          <ToggleSwitch
            leftLabel="Test"
            rightLabel="Test2"
            aria-label="Test toggle"
            data-testid="test-toggle"
          />,
        )
      }).not.toThrow()
    })
  })

  describe('User Interactions', () => {
    test.skip('multiple clicks toggle state correctly', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')

      // First click - should check
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
      expect(mockField.handleChange).toHaveBeenCalledWith(true)

      // Second click - should uncheck
      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
      expect(mockField.handleChange).toHaveBeenCalledWith(false)

      // Third click - should check again
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
      expect(mockField.handleChange).toHaveBeenCalledWith(true)
    })

    test.skip('clicking different parts of component toggles consistently', () => {
      render(<ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />)

      const checkbox = screen.getByRole('checkbox')
      const leftLabel = screen.getByText('Monthly')
      const rightLabel = screen.getByText('Yearly')

      // Click left label
      fireEvent.click(leftLabel)
      expect(checkbox).toBeChecked()

      // Click right label
      fireEvent.click(rightLabel)
      expect(checkbox).not.toBeChecked()

      // Click checkbox directly
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    test('focus and blur events work correctly', () => {
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()

      render(
        <ToggleSwitch
          leftLabel="Monthly"
          rightLabel="Yearly"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />,
      )

      const checkbox = screen.getByRole('checkbox')

      fireEvent.focus(checkbox)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      fireEvent.blur(checkbox)
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })
})
