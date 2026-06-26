import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { TextField } from '../Input'

vi.mock('@/hooks/form-context', () => {
  const meta = {
    errors: ['Enter a valid email address'],
    isTouched: true,
    isValid: false,
  }
  return {
    useFieldContext: () => ({
      name: 'email',
      state: { value: '', meta },
      store: {
        get: () => ({ value: '', meta }),
        subscribe: () => () => {},
      },
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
    }),
    useFormContext: () => ({
      Subscribe: ({ children }: any) => children({ isSubmitting: false }),
    }),
    fieldContext: { Provider: ({ children }: any) => children },
    formContext: { Provider: ({ children }: any) => children },
  }
})

describe('TextField error display', () => {
  it('shows error messages when touched and invalid', () => {
    render(<TextField label="Email" fieldType="email" name="email" />)
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
  })

  it('applies error outline styling when touched and invalid', () => {
    render(<TextField label="Email" fieldType="email" name="email" />)
    expect(screen.getByRole('textbox').className).toContain('outline-red-500')
  })
})
