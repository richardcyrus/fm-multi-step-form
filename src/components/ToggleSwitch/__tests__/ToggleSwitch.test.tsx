import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { ToggleSwitch } from '../ToggleSwitch'
import { renderWithFieldContext } from '@/test-utils'

describe('ToggleSwitch', () => {
  it('renders the left and right labels', () => {
    renderWithFieldContext(
      <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      { fieldName: 'show_yearly', defaultValues: { show_yearly: false } },
    )

    expect(screen.getByText('Monthly')).toBeInTheDocument()
    expect(screen.getByText('Yearly')).toBeInTheDocument()
  })

  it('shows the toggle unchecked when show_yearly is false', () => {
    renderWithFieldContext(
      <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      { fieldName: 'show_yearly', defaultValues: { show_yearly: false } },
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('shows the toggle checked when show_yearly is true', () => {
    renderWithFieldContext(
      <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      { fieldName: 'show_yearly', defaultValues: { show_yearly: true } },
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('uses the field name for the checkbox name', () => {
    renderWithFieldContext(
      <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      { fieldName: 'show_yearly', defaultValues: { show_yearly: false } },
    )

    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'show_yearly')
  })

  it('has id "toggle-switch"', () => {
    renderWithFieldContext(
      <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />,
      { fieldName: 'show_yearly', defaultValues: { show_yearly: false } },
    )

    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'toggle-switch')
  })
})
