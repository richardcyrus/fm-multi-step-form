import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { RadioCard } from '../RadioCard'
import { renderWithFieldContext } from '@/test-utils'

const defaultProps = {
  icon: '/icon-arcade.svg',
  label: 'Arcade',
  price: 9,
  yearlyPrice: 90,
  showYearly: false,
}

describe('RadioCard', () => {
  it('renders the label and monthly price', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    expect(screen.getByText('Arcade')).toBeInTheDocument()
    expect(screen.getByText('$9/mo')).toBeInTheDocument()
  })

  it('shows yearly price when showYearly is true', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} showYearly={true} />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    expect(screen.getByText('$90/yr')).toBeInTheDocument()
  })

  it('shows discount message when showYearly is true', () => {
    renderWithFieldContext(
      <RadioCard
        {...defaultProps}
        showYearly={true}
        discountMessage="2 months free"
      />,
      { fieldName: 'plan', defaultValues: { plan: 'Arcade' } },
    )

    expect(screen.getByText('2 months free')).toBeInTheDocument()
  })

  it('shows default discount message when showYearly is true and no discountMessage provided', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} showYearly={true} />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    expect(screen.getByText('2 months free')).toBeInTheDocument()
  })

  it('does not show discount when showYearly is false', () => {
    renderWithFieldContext(
      <RadioCard
        {...defaultProps}
        showYearly={false}
        discountMessage="2 months free"
      />,
      { fieldName: 'plan', defaultValues: { plan: 'Arcade' } },
    )

    expect(screen.queryByText('2 months free')).not.toBeInTheDocument()
  })

  it('renders the icon image', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    const img = screen.getByAltText('Arcade icon')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/icon-arcade.svg')
  })

  it('has the radio checked when label matches field value', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} label="Arcade" />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    const radio = screen.getByRole('radio')
    expect(radio).toBeChecked()
  })

  it('has the radio unchecked when label does not match field value', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} label="Arcade" />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Pro' },
    })

    const radio = screen.getByRole('radio')
    expect(radio).not.toBeChecked()
  })

  it('radio input has the value matching the label', () => {
    renderWithFieldContext(<RadioCard {...defaultProps} label="Arcade" />, {
      fieldName: 'plan',
      defaultValues: { plan: 'Arcade' },
    })

    expect(screen.getByRole('radio')).toHaveAttribute('value', 'Arcade')
  })
})
