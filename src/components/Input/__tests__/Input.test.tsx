import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { TextField } from '../Input'
import { renderWithFieldContext } from '@/test-utils'

describe('TextField', () => {
  it('renders the label and an input', () => {
    renderWithFieldContext(
      <TextField label="Full Name" fieldType="text" name="full_name" />,
      { fieldName: 'full_name' },
    )
    expect(screen.getByText('Full Name')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('passes placeholder to the input', () => {
    renderWithFieldContext(
      <TextField
        label="Email"
        fieldType="email"
        name="email"
        placeholder="john@example.com"
      />,
      { fieldName: 'email' },
    )
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
  })

  it('input has the correct type', () => {
    renderWithFieldContext(
      <TextField label="Phone" fieldType="tel" name="phone" />,
      { fieldName: 'phone' },
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')
  })

  it('input is associated with the label via htmlFor', () => {
    renderWithFieldContext(
      <TextField label="Name" fieldType="text" name="full_name" />,
      { fieldName: 'full_name' },
    )
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Name').closest('label')
    expect(label).toHaveAttribute('for', 'full_name')
    expect(input).toHaveAttribute('id', 'full_name')
  })
})
