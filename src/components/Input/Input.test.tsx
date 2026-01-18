import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { TextField } from './Input'

const mockField = {
  name: 'testField',
  state: {
    value: '',
    meta: {
      errors: [],
      isTouched: false,
      isValid: true,
    },
  },
  store: {
    subscribe: vi.fn(),
    setState: vi.fn(),
  },
  handleChange: vi.fn(),
  handleBlur: vi.fn(),
}

// TODO: determine proper mock for the Store
const mockStore = {
  subscribe: vi.fn((callback) => {
    callback(mockField.state)
    return () => {}
  }),
  setState: vi.fn(),
  // getState: vi.fn(() => mockField.state),
}

// TODO: determine proper mock for useStore
vi.mock('@tanstack/react-form-start', () => ({
  useStore: (store: any, selector: any) =>
    selector(
      store,
      vi.fn(() => mockField.state),
    ),
}))

vi.mock('@/hooks/form-context', () => ({
  useFieldContext: () => mockField,
}))

describe.skip('TextField Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockField.state.value = ''
    mockField.state.meta.errors = []
    mockField.state.meta.isTouched = false
    mockField.state.meta.isValid = true
    mockField.handleChange = vi.fn()
    mockField.handleBlur = vi.fn()
  })

  describe('Rendering', () => {
    test('renders label with correct text', () => {
      render(<TextField fieldType="text" label="Full Name" name="fullName" />)
      const label = screen.getByText('Full Name')

      expect(label).toBeInTheDocument()
    })

    test('renders input with correct name and id attributes', () => {
      render(<TextField fieldType="text" label="Email" name="email" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('name', 'testField')
      expect(input).toHaveAttribute('id', 'testField')
    })

    test('renders input with correct type attribute', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('type', 'text')
    })

    test('renders placeholder when provided', () => {
      render(
        <TextField
          fieldType="text"
          label="Username"
          name="username"
          placeholder="Enter your username"
        />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', 'Enter your username')
    })

    test('renders tel input type correctly', () => {
      render(<TextField fieldType="tel" label="Phone" name="phone" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('type', 'tel')
    })

    test('renders email input type correctly', () => {
      render(<TextField fieldType="email" label="Email" name="email" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('type', 'email')
    })
  })

  describe('Form Integration', () => {
    test('displays field value from form state', () => {
      mockField.state.value = 'John Doe'
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('John Doe')
    })

    test('calls field handleChange when input value changes', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'Alice' } })

      expect(mockField.handleChange).toHaveBeenCalledWith('Alice')
    })

    test('calls field handleBlur when input loses focus', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      fireEvent.blur(input)

      expect(mockField.handleBlur).toHaveBeenCalledTimes(1)
    })

    test('subscribes to field store for error state', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)

      expect(mockStore.subscribe).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    test('displays error messages when field is touched and invalid', () => {
      mockField.state.meta.isTouched = true
      mockField.state.meta.isValid = false
      mockField.state.meta.errors = ['This field is required']

      render(<TextField fieldType="text" label="Name" name="name" />)
      const errorMessage = screen.getByText('This field is required')

      expect(errorMessage).toBeInTheDocument()
    })

    test('displays multiple error messages', () => {
      mockField.state.meta.isTouched = true
      mockField.state.meta.isValid = false
      mockField.state.meta.errors = [
        'This field is required',
        'Must be at least 3 characters',
      ]

      render(<TextField fieldType="text" label="Name" name="name" />)
      const error1 = screen.getByText('This field is required')
      const error2 = screen.getByText('Must be at least 3 characters')

      expect(error1).toBeInTheDocument()
      expect(error2).toBeInTheDocument()
    })

    test('displays error messages with object format', () => {
      mockField.state.meta.isTouched = true
      mockField.state.meta.isValid = false
      mockField.state.meta.errors = [{ message: 'Invalid format' }]

      render(<TextField fieldType="text" label="Name" name="name" />)
      const errorMessage = screen.getByText('Invalid format')

      expect(errorMessage).toBeInTheDocument()
    })

    test('sets aria-invalid when field is touched and invalid', () => {
      mockField.state.meta.isTouched = true
      mockField.state.meta.isValid = false

      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    test('does not display errors when field is not touched', () => {
      mockField.state.meta.isTouched = false
      mockField.state.meta.isValid = false
      mockField.state.meta.errors = ['This field is required']

      render(<TextField fieldType="text" label="Name" name="name" />)
      const errorMessage = screen.queryByText('This field is required')

      expect(errorMessage).not.toBeInTheDocument()
    })

    test('does not display errors when field is valid', () => {
      mockField.state.meta.isTouched = true
      mockField.state.meta.isValid = true
      mockField.state.meta.errors = ['This field is required']

      render(<TextField fieldType="text" label="Name" name="name" />)
      const errorMessage = screen.queryByText('This field is required')

      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    test('updates value when user types', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'John Doe' } })

      expect(mockField.handleChange).toHaveBeenCalledWith('John Doe')
    })

    test('calls onChange callback when input value changes', () => {
      const handleChange = vi.fn()
      render(
        <TextField
          fieldType="text"
          label="Name"
          name="name"
          onChange={handleChange}
        />,
      )
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'Alice' } })

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('calls onBlur callback when input loses focus', () => {
      const handleBlur = vi.fn()
      render(
        <TextField
          fieldType="text"
          label="Name"
          name="name"
          onBlur={handleBlur}
        />,
      )
      const input = screen.getByRole('textbox')

      fireEvent.blur(input)

      expect(handleBlur).toHaveBeenCalledTimes(1)
      expect(mockField.handleBlur).toHaveBeenCalledTimes(1)
    })

    test('calls onFocus callback when input receives focus', () => {
      const handleFocus = vi.fn()
      render(
        <TextField
          fieldType="text"
          label="Name"
          name="name"
          onFocus={handleFocus}
        />,
      )
      const input = screen.getByRole('textbox')

      fireEvent.focus(input)

      expect(handleFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('Input Attributes', () => {
    test('respects disabled attribute', () => {
      render(
        <TextField fieldType="text" label="Name" name="name" disabled={true} />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })

    test('respects required attribute', () => {
      render(
        <TextField fieldType="text" label="Name" name="name" required={true} />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toBeRequired()
    })

    test('applies custom className via props', () => {
      const { container } = render(
        <TextField
          fieldType="text"
          label="Name"
          name="name"
          className="custom-class"
        />,
      )
      const input = container.querySelector('input.custom-class')

      expect(input).toBeInTheDocument()
    })

    test('handles multiple attributes passed as spread props', () => {
      render(
        <TextField
          fieldType="text"
          label="Phone"
          name="phone"
          placeholder="(555) 123-4567"
          required={true}
          maxLength={15}
        />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', '(555) 123-4567')
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('maxLength', '15')
    })

    test('applies aria attributes correctly', () => {
      render(
        <TextField
          fieldType="text"
          label="Accessible Input"
          name="accessible"
          aria-describedby="input-description"
        />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('aria-describedby', 'input-description')
    })
  })

  describe('Accessibility', () => {
    test('associates label with input correctly', () => {
      render(<TextField fieldType="text" label="Email Address" name="email" />)
      const label = screen.getByLabelText('Email Address', { exact: false })

      expect(label).toBeInTheDocument()
      expect(label).toHaveAttribute('type', 'text')
    })

    test('input element is accessible by role', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
    })

    test('label is clickable and focuses input', () => {
      render(<TextField fieldType="text" label="Name" name="name" />)
      const input = screen.getByRole('textbox')
      const label = screen.getByText('Name')

      fireEvent.click(label)

      expect(document.activeElement).toBe(input)
    })
  })

  describe('Special Field Types', () => {
    test('adds is-tel class for telephone fields', () => {
      const { container } = render(
        <TextField fieldType="tel" label="Phone" name="phone" />,
      )
      const group = container.querySelector('.is-tel')

      expect(group).toBeInTheDocument()
    })

    test('does not add is-tel class for non-telephone fields', () => {
      const { container } = render(
        <TextField fieldType="text" label="Name" name="name" />,
      )
      const group = container.querySelector('.is-tel')

      expect(group).not.toBeInTheDocument()
    })
  })
})
