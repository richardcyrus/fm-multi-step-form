import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxCard } from './CheckboxCard'

describe('CheckboxCard Component', () => {
  const defaultProps = {
    label: 'Online Service',
    subLabel: 'Access to multiplayer games',
    price: 9,
    showYearly: false,
    yearlyPrice: 90,
  }

  describe('Rendering', () => {
    test('renders checkbox card with correct label', () => {
      render(<CheckboxCard {...defaultProps} />)
      const label = screen.getByText('Online Service')

      expect(label).toBeInTheDocument()
    })

    test('renders checkbox card with correct subLabel', () => {
      render(<CheckboxCard {...defaultProps} />)
      const subLabel = screen.getByText('Access to multiplayer games')

      expect(subLabel).toBeInTheDocument()
    })

    test.skip('renders checkbox input with correct value', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveValue('online service')
    })

    test('renders monthly price when showYearly is false', () => {
      render(<CheckboxCard {...defaultProps} showYearly={false} />)
      const price = screen.getByText('+$9/mo')

      expect(price).toBeInTheDocument()
    })

    test('renders yearly price when showYearly is true', () => {
      render(<CheckboxCard {...defaultProps} showYearly={true} />)
      const price = screen.getByText('+$90/yr')

      expect(price).toBeInTheDocument()
    })

    test('renders label element with correct classes', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const label = container.querySelector('label')

      expect(label).toHaveClass(
        'grid',
        'min-h-15.5',
        'cursor-pointer',
        'grid-cols-[1.25rem_2fr_1fr]',
        'items-center',
        'rounded-lg',
        'border',
        'border-purple-200',
        'bg-white',
        'px-4',
        'py-[.71875rem]',
        'hover:border-purple-600',
        'has-checked:border-purple-600',
        'has-checked:bg-blue-50',
        'md:min-h-20.25',
        'md:px-6',
        'md:py-4',
      )
    })

    test('renders checkbox input with correct classes', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const input = container.querySelector('input[type="checkbox"]')

      expect(input).toHaveClass(
        'peer',
        'h-5',
        'w-5',
        'cursor-pointer',
        'appearance-none',
        'rounded',
        'border',
        'border-purple-200',
        'transition-all',
        'checked:bg-purple-600',
      )
    })

    test('renders checkmark SVG', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const svg = container.querySelector('svg')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 12 9')
    })
  })

  describe('Checkbox Input Behavior', () => {
    test('checkbox input can be checked', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).not.toBeChecked()

      fireEvent.click(checkboxInput)

      expect(checkboxInput).toBeChecked()
    })

    test('calls onChange when checkbox is toggled', () => {
      const handleChange = vi.fn()
      render(<CheckboxCard {...defaultProps} onChange={handleChange} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('checkbox input can be controlled via checked prop', () => {
      render(<CheckboxCard {...defaultProps} checked={true} readOnly />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeChecked()
    })

    test('checkbox input respects name attribute', () => {
      render(<CheckboxCard {...defaultProps} name="addons" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveAttribute('name', 'addons')
    })

    test('checkbox input respects required attribute', () => {
      render(<CheckboxCard {...defaultProps} required={true} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeRequired()
    })

    test('checkbox input respects disabled attribute', () => {
      render(<CheckboxCard {...defaultProps} disabled={true} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeDisabled()
    })

    test('checkbox can be unchecked after being checked', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)
      expect(checkboxInput).toBeChecked()

      fireEvent.click(checkboxInput)
      expect(checkboxInput).not.toBeChecked()
    })
  })

  describe('Props Spreading', () => {
    test('spreads additional props to checkbox input', () => {
      render(<CheckboxCard {...defaultProps} data-testid="custom-checkbox" />)
      const checkboxInput = screen.getByTestId('custom-checkbox')

      expect(checkboxInput).toBeInTheDocument()
    })

    test('handles multiple additional props', () => {
      render(
        <CheckboxCard
          {...defaultProps}
          name="addon"
          required={true}
          data-testid="addon-checkbox"
        />,
      )
      const checkboxInput = screen.getByTestId('addon-checkbox')

      expect(checkboxInput).toHaveAttribute('name', 'addon')
      expect(checkboxInput).toBeRequired()
    })

    test('applies aria-label when provided', () => {
      render(
        <CheckboxCard {...defaultProps} aria-label="Select Online Service" />,
      )
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveAttribute(
        'aria-label',
        'Select Online Service',
      )
    })

    test('applies custom id when provided', () => {
      render(<CheckboxCard {...defaultProps} id="online-service" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveAttribute('id', 'online-service')
    })
  })

  describe('Accessibility', () => {
    test.skip('checkbox input is keyboard accessible', () => {
      const handleChange = vi.fn()
      render(<CheckboxCard {...defaultProps} onChange={handleChange} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.keyDown(checkboxInput, { key: ' ', code: 'Space' })

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('checkbox input can be found by role', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeInTheDocument()
    })

    test('label is clickable and toggles checkbox', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')
      const label = checkboxInput.closest('label')

      expect(checkboxInput).not.toBeChecked()

      if (label) {
        fireEvent.click(label)
      }

      expect(checkboxInput).toBeChecked()
    })

    test.skip('disabled checkbox cannot be toggled', () => {
      const handleChange = vi.fn()
      render(
        <CheckboxCard
          {...defaultProps}
          disabled={true}
          onChange={handleChange}
        />,
      )
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)

      expect(handleChange).not.toHaveBeenCalled()
      expect(checkboxInput).not.toBeChecked()
    })
  })

  describe('Price Display Logic', () => {
    test('displays correct monthly price format', () => {
      render(<CheckboxCard {...defaultProps} price={12} showYearly={false} />)
      const price = screen.getByText('+$12/mo')

      expect(price).toBeInTheDocument()
    })

    test('displays correct yearly price format', () => {
      render(
        <CheckboxCard {...defaultProps} yearlyPrice={120} showYearly={true} />,
      )
      const price = screen.getByText('+$120/yr')

      expect(price).toBeInTheDocument()
    })

    test('handles zero prices correctly', () => {
      render(
        <CheckboxCard
          {...defaultProps}
          price={0}
          yearlyPrice={0}
          showYearly={false}
        />,
      )
      const monthlyPrice = screen.getByText('+$0/mo')

      expect(monthlyPrice).toBeInTheDocument()
    })

    test('handles large prices correctly', () => {
      render(
        <CheckboxCard
          {...defaultProps}
          price={999}
          yearlyPrice={9999}
          showYearly={true}
        />,
      )
      const yearlyPrice = screen.getByText('+$9999/yr')

      expect(yearlyPrice).toBeInTheDocument()
    })
  })

  describe.skip('Label Text Cases', () => {
    test('handles uppercase labels correctly', () => {
      render(<CheckboxCard {...defaultProps} label="ONLINE SERVICE" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveValue('online service')
    })

    test('handles labels with spaces correctly', () => {
      render(<CheckboxCard {...defaultProps} label="Custom Profile" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveValue('custom profile')
    })

    test('handles labels with special characters correctly', () => {
      render(<CheckboxCard {...defaultProps} label="Pro-Plus!" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveValue('pro-plus!')
    })

    test('handles labels with numbers correctly', () => {
      render(<CheckboxCard {...defaultProps} label="Service 2.0" />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveValue('service 2.0')
    })
  })

  describe('Checkmark Visibility', () => {
    test('checkmark is hidden when checkbox is unchecked', () => {
      render(<CheckboxCard {...defaultProps} />)
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const checkmark = container.querySelector('.peer-checked\\:opacity-100')

      expect(checkmark).toHaveClass('opacity-0')
    })

    test.skip('checkmark becomes visible when checkbox is checked', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')
      const checkmark = container.querySelector('.peer-checked\\:opacity-100')

      fireEvent.click(checkboxInput)

      expect(checkmark).toHaveClass('opacity-100')
    })
  })
})
