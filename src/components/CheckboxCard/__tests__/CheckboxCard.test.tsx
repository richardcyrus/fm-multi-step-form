import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { CheckboxCard } from '../CheckboxCard'
import { renderWithFieldContext } from '@/test-utils'

describe('CheckboxCard', () => {
  it('renders the label, sub label, and price', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Online Service"
        subLabel="Access to multiplayer games"
        price={1}
        yearlyPrice={10}
        showYearly={false}
        value="online_service"
      />,
      { fieldName: 'addons', defaultValues: { addons: [] } },
    )

    expect(screen.getByText('Online Service')).toBeInTheDocument()
    expect(screen.getByText('Access to multiplayer games')).toBeInTheDocument()
    expect(screen.getByText('+$1/mo')).toBeInTheDocument()
  })

  it('shows yearly price when showYearly is true', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Larger Storage"
        subLabel="Extra 1TB of cloud save"
        price={2}
        yearlyPrice={20}
        showYearly={true}
        value="larger_storage"
      />,
      { fieldName: 'addons', defaultValues: { addons: [] } },
    )

    expect(screen.getByText('+$20/yr')).toBeInTheDocument()
  })

  it('renders a checkbox input', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Online Service"
        subLabel="Access to multiplayer games"
        price={1}
        yearlyPrice={10}
        showYearly={false}
        value="online_service"
      />,
      { fieldName: 'addons', defaultValues: { addons: [] } },
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  it('checkbox name matches the field name', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Online Service"
        subLabel="Access to multiplayer games"
        price={1}
        yearlyPrice={10}
        showYearly={false}
        value="online_service"
      />,
      { fieldName: 'addons', defaultValues: { addons: [] } },
    )

    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'addons')
  })

  it('is checked when value is in field state array', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Online Service"
        subLabel="Access to multiplayer games"
        price={1}
        yearlyPrice={10}
        showYearly={false}
        value="online_service"
      />,
      {
        fieldName: 'addons',
        defaultValues: { addons: ['online_service'] },
      },
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('is unchecked when value is not in field state array', () => {
    renderWithFieldContext(
      <CheckboxCard
        isArray={true}
        label="Online Service"
        subLabel="Access to multiplayer games"
        price={1}
        yearlyPrice={10}
        showYearly={false}
        value="online_service"
      />,
      {
        fieldName: 'addons',
        defaultValues: { addons: ['larger_storage'] },
      },
    )

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
