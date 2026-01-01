import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { TextField } from './Input'

describe('TextField Component', () => {
  test('renders label with correct text', () => {
    render(<TextField label="Full Name" name="fullName" />)
    const label = screen.getByText('Full Name')

    expect(label).toBeInTheDocument()
  })

  test('renders input with correct name and id attributes', () => {
    render(<TextField label="Email" name="email" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('name', 'email')
    expect(input).toHaveAttribute('id', 'email')
  })

  test('renders input with correct type attribute', () => {
    render(<TextField label="Name" name="name" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('type', 'text')
  })

  test('renders placeholder when provided', () => {
    render(
      <TextField
        label="Username"
        name="username"
        placeholder="Enter your username"
      />,
    )
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('placeholder', 'Enter your username')
  })

  test('updates value when user types', () => {
    render(<TextField label="Name" name="name" />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'John Doe' } })

    expect(input).toHaveValue('John Doe')
  })

  test('calls onChange callback when input value changes', () => {
    const handleChange = vi.fn()
    render(<TextField label="Name" name="name" onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Alice' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Alice',
        }),
      }),
    )
  })

  test('calls onBlur callback when input loses focus', () => {
    const handleBlur = vi.fn()
    render(<TextField label="Name" name="name" onBlur={handleBlur} />)
    const input = screen.getByRole('textbox')

    fireEvent.blur(input)

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  test('calls onFocus callback when input receives focus', () => {
    const handleFocus = vi.fn()
    render(<TextField label="Name" name="name" onFocus={handleFocus} />)
    const input = screen.getByRole('textbox')

    fireEvent.focus(input)

    expect(handleFocus).toHaveBeenCalledTimes(1)
  })

  test('respects disabled attribute', () => {
    render(<TextField label="Name" name="name" disabled={true} />)
    const input = screen.getByRole('textbox')

    expect(input).toBeDisabled()
  })

  test('respects required attribute', () => {
    render(<TextField label="Name" name="name" required={true} />)
    const input = screen.getByRole('textbox')

    expect(input).toBeRequired()
  })

  test('applies custom className via props', () => {
    const { container } = render(
      <TextField label="Name" name="name" className="custom-class" />,
    )
    const input = container.querySelector('input.custom-class')

    expect(input).toBeInTheDocument()
  })

  test('associates label with input correctly', () => {
    render(<TextField label="Email Address" name="email" />)
    const label = screen.getByLabelText('Email Address', { exact: false })

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('type', 'text')
  })

  test('handles multiple attributes passed as spread props', () => {
    render(
      <TextField
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

  test('input element is accessible', () => {
    render(
      <TextField
        label="Accessible Input"
        name="accessible"
        aria-describedby="input-description"
      />,
    )
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('aria-describedby', 'input-description')
  })
})
