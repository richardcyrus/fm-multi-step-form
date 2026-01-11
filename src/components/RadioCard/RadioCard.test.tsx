import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { RadioCard } from './RadioCard'

describe('RadioCard Component', () => {
  const defaultProps = {
    icon: '../../assets/icon-arcade.svg',
    label: 'Arcade',
    price: 9,
    showYearly: false,
    yearlyPrice: 90,
  }

  describe('Rendering', () => {
    test('renders radio card with correct label', () => {
      render(<RadioCard {...defaultProps} />)
      const label = screen.getByText('Arcade')

      expect(label).toBeInTheDocument()
    })

    test('renders radio input with correct value', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      // @eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioInput).toHaveAttribute('value', 'arcade')
    })

    test('renders icon image with correct src', () => {
      render(<RadioCard {...defaultProps} />)
      const icon = screen.getByRole('img')

      expect(icon).toHaveAttribute('src', '../../assets/icon-arcade.svg')
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

    test('renders radio input with correct classes', () => {
      const { container } = render(<RadioCard {...defaultProps} />)
      const input = container.querySelector('input[type="radio"]')

      expect(input).toHaveClass(
        'absolute',
        'h-0',
        'w-0',
        'cursor-pointer',
        'opacity-0',
      )
    })
  })

  describe('Radio Input Behavior', () => {
    test('radio input can be selected', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).not.toBeChecked()

      fireEvent.click(radioInput)

      expect(radioInput).toBeChecked()
    })

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

    test('radio input respects name attribute', () => {
      render(<RadioCard {...defaultProps} name="plan" />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toHaveAttribute('name', 'plan')
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
  })

  describe('Accessibility', () => {
    test.skip('radio input is keyboard accessible', () => {
      const handleChange = vi.fn()
      render(<RadioCard {...defaultProps} onChange={handleChange} />)
      const radioInput = screen.getByRole('radio')

      fireEvent.keyDown(radioInput, { key: ' ', code: 'Space' })

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('radio input can be found by role', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')

      expect(radioInput).toBeInTheDocument()
    })

    test('label is clickable and selects radio', () => {
      render(<RadioCard {...defaultProps} />)
      const radioInput = screen.getByRole('radio')
      const label = radioInput.closest('label')

      expect(radioInput).not.toBeChecked()

      if (label) {
        fireEvent.click(label)
      }

      expect(radioInput).toBeChecked()
    })

    test.skip('disabled radio input cannot be selected', () => {
      const handleChange = vi.fn()
      render(
        <RadioCard {...defaultProps} disabled={true} onChange={handleChange} />,
      )
      const radioInput = screen.getByRole('radio')

      fireEvent.click(radioInput)

      expect(handleChange).not.toHaveBeenCalled()
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
  })

  describe('Label Text Cases', () => {
    test('handles uppercase labels correctly', () => {
      render(<RadioCard {...defaultProps} label="ADVANCED" />)
      const radioInput = screen.getByRole('radio')

      // @eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioInput).toHaveAttribute('value', 'advanced')
    })

    test('handles labels with spaces correctly', () => {
      render(<RadioCard {...defaultProps} label="Pro Plan" />)
      const radioInput = screen.getByRole('radio')

      // @eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioInput).toHaveAttribute('value', 'pro plan')
    })

    test('handles labels with special characters correctly', () => {
      render(<RadioCard {...defaultProps} label="Pro-Plus!" />)
      const radioInput = screen.getByRole('radio')

      // @eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioInput).toHaveAttribute('value', 'pro-plus!')
    })
  })
})
