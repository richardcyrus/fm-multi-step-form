import { beforeEach, describe, expect, it } from 'vitest'
import { useGamingPlanStore } from '../store'

beforeEach(() => {
  localStorage.clear()
  useGamingPlanStore.setState(useGamingPlanStore.getInitialState(), true)
})

describe('initial state', () => {
  it('has default values', () => {
    const state = useGamingPlanStore.getState()
    expect(state.full_name).toBe('')
    expect(state.email_address).toBe('')
    expect(state.phone_number).toBe('')
    expect(state.show_yearly).toBe(false)
    expect(state.plan).toBe('Arcade')
    expect(state.plan_monthly_price).toBe(9)
    expect(state.plan_yearly_price).toBe(90)
    expect(state.addons).toEqual([])
    expect(state.chosen_addons).toEqual([])
  })
})

describe('setData', () => {
  it('merges partial data into state', () => {
    useGamingPlanStore.getState().setData({ full_name: 'Alice' })
    const state = useGamingPlanStore.getState()
    expect(state.full_name).toBe('Alice')
    expect(state.email_address).toBe('')
  })

  it('overwrites existing values', () => {
    useGamingPlanStore.getState().setData({ full_name: 'Alice' })
    useGamingPlanStore.getState().setData({ full_name: 'Bob' })
    expect(useGamingPlanStore.getState().full_name).toBe('Bob')
  })
})

describe('updatePlan', () => {
  it('updates plan and prices for a valid label', () => {
    useGamingPlanStore.getState().updatePlan('Pro')
    const state = useGamingPlanStore.getState()
    expect(state.plan).toBe('Pro')
    expect(state.plan_monthly_price).toBe(15)
    expect(state.plan_yearly_price).toBe(150)
  })

  it('does not change state for an invalid label', () => {
    useGamingPlanStore.getState().updatePlan('Nonexistent')
    const state = useGamingPlanStore.getState()
    expect(state.plan).toBe('Arcade')
    expect(state.plan_monthly_price).toBe(9)
    expect(state.plan_yearly_price).toBe(90)
  })
})

describe('toggleBilling', () => {
  it('flips show_yearly from false to true', () => {
    expect(useGamingPlanStore.getState().show_yearly).toBe(false)
    useGamingPlanStore.getState().toggleBilling()
    expect(useGamingPlanStore.getState().show_yearly).toBe(true)
  })

  it('flips show_yearly from true to false', () => {
    useGamingPlanStore.getState().toggleBilling()
    useGamingPlanStore.getState().toggleBilling()
    expect(useGamingPlanStore.getState().show_yearly).toBe(false)
  })
})

describe('getTotalPrice', () => {
  it('returns the plan monthly price when show_yearly is false and no argument given', () => {
    const total = useGamingPlanStore.getState().getTotalPrice()
    expect(total).toBe(9)
  })

  it('returns the plan yearly price when show_yearly is true and no argument given', () => {
    useGamingPlanStore.getState().toggleBilling()
    const total = useGamingPlanStore.getState().getTotalPrice()
    expect(total).toBe(90)
  })

  it('returns plan monthly price when explicitly passed false', () => {
    useGamingPlanStore.getState().toggleBilling()
    const total = useGamingPlanStore.getState().getTotalPrice(false)
    expect(total).toBe(9)
  })

  it('returns plan yearly price when explicitly passed true', () => {
    const total = useGamingPlanStore.getState().getTotalPrice(true)
    expect(total).toBe(90)
  })

  it('includes addon prices when addons are chosen', () => {
    useGamingPlanStore.getState().setData({
      chosen_addons: [
        {
          name: 'online_service',
          label: 'Online Service',
          description: 'Access to multiplayer games',
          monthly_price: 1,
          yearly_price: 10,
        },
      ],
    })
    const monthlyTotal = useGamingPlanStore.getState().getTotalPrice(false)
    expect(monthlyTotal).toBe(9 + 1)

    const yearlyTotal = useGamingPlanStore.getState().getTotalPrice(true)
    expect(yearlyTotal).toBe(90 + 10)
  })

  it('returns just the plan price when no addons are chosen', () => {
    const monthlyTotal = useGamingPlanStore.getState().getTotalPrice(false)
    expect(monthlyTotal).toBe(9)

    const yearlyTotal = useGamingPlanStore.getState().getTotalPrice(true)
    expect(yearlyTotal).toBe(90)
  })
})

describe('reset', () => {
  it('restores state to initial values', () => {
    useGamingPlanStore.getState().setData({
      full_name: 'Changed',
      email_address: 'changed@test.com',
    })
    useGamingPlanStore.getState().reset()
    const state = useGamingPlanStore.getState()
    expect(state.full_name).toBe('')
    expect(state.email_address).toBe('')
    expect(state.phone_number).toBe('')
    expect(state.show_yearly).toBe(false)
  })
})
