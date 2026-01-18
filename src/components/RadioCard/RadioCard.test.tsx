import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { RadioCard } from './RadioCard'

const mockField = {
  name: 'plan',
  state: {
    value: '',
  },
  handleChange: vi.fn(),
}

vi.mock('@/hooks/form-context', () => ({
  useFieldContext: () => mockField,
}))

describe('RadioCard Component', () => {
  const defaultProps = {
    icon: '../../assets/icon-arcade.svg',
    label: 'Arcade',
    price: 9,
    showYearly: false,
    yearlyPrice: 90,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockField.state.value = ''
    mockField.handleChange = vi.fn()
  })

  describe('Rendering', () => {
    test('renders radio card with correct label', () => {
      render(<RadioCard {...defaultProps} />)
      const label = screen.getByText('Arcade')

      expect(label).toBeInTheDocument()
    })

    test('renders radio input with correct type', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('type', 'radio')
    })

    test('renders icon image with correct src and alt', () => {
      render(<RadioCard {...defaultProps} />)
      const icon = screen.getByRole('img')

      expect(icon).toHaveAttribute('src', '../../assets/icon-arcade.svg')
      expect(icon).toHaveAttribute('alt', 'Arcade icon')
    })

    test('renders monthly price when showYearly is false', () => {
      render(<RadioCard {...defaultProps} showYearly={false} />)
      const price = screen.getByText('$9/mo')

      expect(price).toBeInTheDocument()
    })

    test('renders yearly price when showYearly is true', () => {
      render(<RadioCard {...defaultProps} showYearly={true} />)
      const price = screen.getByText('$90/yr')

      expect(price).toBeInTheDocument()
    })

    test('renders default discount message when showYearly is true and no discountMessage provided', () => {
      render(<RadioCard {...defaultProps} showYearly={true} />)
      const discount = screen.getByText('2 months free')

      expect(discount).toBeInTheDocument()
    })

    test('renders custom discount message when provided', () => {
      render(
        <RadioCard
          {...defaultProps}
          showYearly={true}
          discountMessage="3 months free"
        />,
      )
      const discount = screen.getByText('3 months free')

      expect(discount).toBeInTheDocument()
    })

    test('does not render discount message when showYearly is false', () => {
      render(<RadioCard {...defaultProps} showYearly={false} />)
      const discount = screen.queryByText(/months free/)

      expect(discount).not.toBeInTheDocument()
    })

    test('renders radio input with correct value based on label', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('value', 'Arcade')
    })
  })

  describe('Form Integration', () => {
    test('uses field name from form context', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('name', 'plan')
    })

    test('calls field handleChange when radio is selected', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      fireEvent.click(radioInput)

      expect(mockField.handleChange).toHaveBeenCalledWith('Arcade')
    })

    test('radio is checked when field value matches label', () => {
      mockField.state.value = 'Arcade'
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeChecked()
    })

    test('radio is not checked when field value does not match label', () => {
      mockField.state.value = 'Advanced'
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).not.toBeChecked()
    })
  })

  describe('Radio Input Behavior', () => {
    test('calls onChange when radio is selected', () => {
      const handleChange = vi.fn()
      render(<RadioCard {...defaultProps} onChange={handleChange} />)
      const radioInput = screen.getByRole('radio')

      fireEvent.click(radioInput)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('radio input can be controlled via checked prop', () => {
      render(<RadioCard {...defaultProps} checked={true} readOnly />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeChecked()
    })

    test('radio input respects name attribute override', () => {
      render(<RadioCard {...defaultProps} name="subscription" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('name', 'subscription')
    })

    test('radio input respects required attribute', () => {
      render(<RadioCard {...defaultProps} required={true} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeRequired()
    })

    test('radio input respects disabled attribute', () => {
      render(<RadioCard {...defaultProps} disabled={true} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeDisabled()
    })
  })

  describe('Props Spreading', () => {
    test('spreads additional props to radio input', () => {
      render(<RadioCard {...defaultProps} data-testid="custom-radio" />)
      const radioInput = screen.getByTestId('custom-radio')

      expect(radioInput).toBeInTheDocument()
    })

    test('handles multiple additional props', () => {
      render(
        <RadioCard
          {...defaultProps}
          name="subscription"
          required={true}
          data-testid="subscription-radio"
        />,
      )
      const radioInput = screen.getByTestId('subscription-radio')

      expect(radioInput).toHaveAttribute('name', 'subscription')
      expect(radioInput).toBeRequired()
    })

    test('applies aria-label when provided', () => {
      render(<RadioCard {...defaultProps} aria-label="Select Arcade plan" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('aria-label', 'Select Arcade plan')
    })

    test('applies custom id when provided', () => {
      render(<RadioCard {...defaultProps} id="arcade-plan" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('id', 'arcade-plan')
    })
  })

  describe('Accessibility', () => {
    test('radio input can be found by role', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeInTheDocument()
    })

    test('icon has proper alt text for accessibility', () => {
      render(<RadioCard {...defaultProps} />)
      const icon = screen.getByRole('img')

      expect(icon).toHaveAttribute('alt', 'Arcade icon')
    })
  })

  describe('Price Display Logic', () => {
    test('displays correct monthly price format', () => {
      render(<RadioCard {...defaultProps} price={12} showYearly={false} />)
      const price = screen.getByText('$12/mo')

      expect(price).toBeInTheDocument()
    })

    test('displays correct yearly price format', () => {
      render(
        <RadioCard {...defaultProps} yearlyPrice={120} showYearly={true} />,
      )
      const price = screen.getByText('$120/yr')

      expect(price).toBeInTheDocument()
    })

    test('handles zero prices correctly', () => {
      render(<RadioCard {...defaultProps} price={0} yearlyPrice={0} />)
      const monthlyPrice = screen.getByText('$0/mo')

      expect(monthlyPrice).toBeInTheDocument()
    })

    test('handles large prices correctly', () => {
      render(
        <RadioCard
          {...defaultProps}
          price={999}
          yearlyPrice={9999}
          showYearly={true}
        />,
      )
      const yearlyPrice = screen.getByText('$9999/yr')

      expect(yearlyPrice).toBeInTheDocument()
    })

    test('displays discount message with proper styling', () => {
      render(
        <RadioCard
          {...defaultProps}
          showYearly={true}
          discountMessage="Special offer"
        />,
      )
      const discount = screen.getByText('Special offer')

      expect(discount).toBeInTheDocument()
    })
  })

  describe('Label Value Handling', () => {
    test('handles uppercase labels correctly', () => {
      render(<RadioCard {...defaultProps} label="ADVANCED" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('value', 'ADVANCED')
      expect(screen.getByText('ADVANCED')).toBeInTheDocument()
    })

    test('handles labels with spaces correctly', () => {
      render(<RadioCard {...defaultProps} label="Pro Plan" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('value', 'Pro Plan')
      expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    })

    test('handles labels with special characters correctly', () => {
      render(<RadioCard {...defaultProps} label="Pro-Plus!" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('value', 'Pro-Plus!')
      expect(screen.getByText('Pro-Plus!')).toBeInTheDocument()
    })

    test('handles labels with numbers correctly', () => {
      render(<RadioCard {...defaultProps} label="Plan 2.0" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('value', 'Plan 2.0')
      expect(screen.getByText('Plan 2.0')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('renders without crashing when all props are provided', () => {
      expect(() => {
        render(<RadioCard {...defaultProps} />)
      }).not.toThrow()
    })

    test('handles missing discountMessage gracefully', () => {
      expect(() => {
        render(<RadioCard {...defaultProps} showYearly={true} />)
      }).not.toThrow()
    })

    test('handles empty icon path gracefully', () => {
      expect(() => {
        render(<RadioCard {...defaultProps} icon="" />)
      }).not.toThrow()
    })
  })
})
