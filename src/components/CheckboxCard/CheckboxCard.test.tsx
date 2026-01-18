import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { CheckboxCard } from './CheckboxCard'

const mockFieldContext = {
  name: 'addons',
  state: {
    value: [],
  },
  setValue: vi.fn(),
  pushValue: vi.fn(),
  removeValue: vi.fn(),
}

vi.mock('@/hooks/form-context', () => ({
  useFieldContext: () => mockFieldContext,
}))

describe('CheckboxCard Component', () => {
  const defaultProps = {
    isArray: true,
    label: 'Online Service',
    subLabel: 'Access to multiplayer games',
    price: 9,
    showYearly: false,
    yearlyPrice: 90,
    value: 'online-service',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockFieldContext.state.value = []
    mockFieldContext.setValue = vi.fn()
    mockFieldContext.pushValue = vi.fn()
    mockFieldContext.removeValue = vi.fn()
  })

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

    test('renders checkmark SVG', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const svg = container.querySelector('svg')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 12 9')
    })

    test('renders checkbox input with correct type', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toHaveAttribute('type', 'checkbox')
    })
  })

  describe('Form Integration', () => {
    test('throws error when isArray is true but no value is provided', () => {
      expect(() => {
        render(<CheckboxCard {...defaultProps} value="" />)
      }).toThrow('Checkboxes that are used as an array must have a value.')
    })

    test('initializes empty array when field value is undefined', () => {
      mockFieldContext.state.value = undefined
      render(<CheckboxCard {...defaultProps} />)

      expect(mockFieldContext.setValue).toHaveBeenCalledWith([])
    })

    test('calls pushValue when checkbox is checked', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)

      expect(mockFieldContext.pushValue).toHaveBeenCalledWith('online-service')
    })

    test('calls removeValue when checkbox is unchecked', () => {
      mockFieldContext.state.value = ['online-service']
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)

      expect(mockFieldContext.removeValue).toHaveBeenCalledWith(0)
    })

    test('checkbox is checked when value exists in field array', () => {
      mockFieldContext.state.value = ['online-service']
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeChecked()
    })

    test('checkbox is unchecked when value does not exist in field array', () => {
      mockFieldContext.state.value = ['other-service']
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).not.toBeChecked()
    })
  })

  describe('Checkbox Input Behavior', () => {
    // test('checkbox input can be checked and unchecked', () => {
    //   render(<CheckboxCard {...defaultProps} />)
    //   const checkboxInput = screen.getByRole('checkbox')

    //   expect(checkboxInput).not.toBeChecked()

    //   fireEvent.click(checkboxInput)
    //   expect(checkboxInput).toBeChecked()

    //   fireEvent.click(checkboxInput)
    //   expect(checkboxInput).not.toBeChecked()
    // })

    test('calls onChange when checkbox is toggled', () => {
      const handleChange = vi.fn()
      render(<CheckboxCard {...defaultProps} onChange={handleChange} />)
      const checkboxInput = screen.getByRole('checkbox')

      fireEvent.click(checkboxInput)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('checkbox input respects name attribute from field context', () => {
      render(<CheckboxCard {...defaultProps} />)
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
          required={true}
          data-testid="addon-checkbox"
        />,
      )
      const checkboxInput = screen.getByTestId('addon-checkbox')

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
    test('checkbox input can be found by role', () => {
      render(<CheckboxCard {...defaultProps} />)
      const checkboxInput = screen.getByRole('checkbox')

      expect(checkboxInput).toBeInTheDocument()
    })

    // test('label is clickable and toggles checkbox', () => {
    //   render(<CheckboxCard {...defaultProps} />)
    //   const checkboxInput = screen.getByRole('checkbox')
    //   const label = checkboxInput.closest('label')

    //   expect(checkboxInput).not.toBeChecked()

    //   if (label) {
    //     fireEvent.click(label)
    //   }

    //   expect(checkboxInput).toBeChecked()
    // })

    // test('disabled checkbox cannot be toggled', () => {
    //   const handleChange = vi.fn()
    //   render(
    //     <CheckboxCard
    //       {...defaultProps}
    //       disabled={true}
    //       onChange={handleChange}
    //     />,
    //   )
    //   const checkboxInput = screen.getByRole('checkbox')

    //   fireEvent.click(checkboxInput)

    //   expect(handleChange).not.toHaveBeenCalled()
    //   expect(checkboxInput).not.toBeChecked()
    // })
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

    test('displays price with correct alignment', () => {
      const { container } = render(<CheckboxCard {...defaultProps} />)
      const priceElement = container.querySelector('.text-right')

      expect(priceElement).toBeInTheDocument()
      expect(priceElement).toHaveTextContent('+$9/mo')
    })
  })

  describe('Error Handling', () => {
    test('renders without crashing when all props are provided', () => {
      expect(() => {
        render(<CheckboxCard {...defaultProps} />)
      }).not.toThrow()
    })

    test('handles missing subLabel gracefully', () => {
      expect(() => {
        render(<CheckboxCard {...defaultProps} subLabel="" />)
      }).not.toThrow()
    })
  })
})
