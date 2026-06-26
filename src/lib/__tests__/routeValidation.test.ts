import { describe, expect, it } from 'vitest'
import {
  validateAddons,
  validatePersonalInfo,
  validatePlanSelection,
  validateSummary,
} from '../routeValidation'
import type { GamingPlanSchema } from '../schema'

function makeStore(overrides?: Partial<GamingPlanSchema>): GamingPlanSchema {
  return {
    full_name: 'John Doe',
    email_address: 'john@example.com',
    phone_number: '+1 234 567 890',
    show_yearly: false,
    plan: 'Arcade',
    plan_monthly_price: 9,
    plan_yearly_price: 90,
    addons: [],
    chosen_addons: [],
    ...overrides,
  }
}

describe('validatePersonalInfo', () => {
  it('returns isValid:true when all fields are present', () => {
    const result = validatePersonalInfo(makeStore())
    expect(result.isValid).toBe(true)
    expect(result.redirectTo).toBeUndefined()
    expect(result.missingFields).toEqual([])
  })

  it('returns isValid:false when full_name is missing', () => {
    const result = validatePersonalInfo(makeStore({ full_name: '' }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/your-info')
    expect(result.missingFields).toContain('full_name')
  })

  it('returns isValid:false when email_address is missing', () => {
    const result = validatePersonalInfo(makeStore({ email_address: '' }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/your-info')
    expect(result.missingFields).toContain('email_address')
  })

  it('returns isValid:false when phone_number is missing', () => {
    const result = validatePersonalInfo(makeStore({ phone_number: '' }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/your-info')
    expect(result.missingFields).toContain('phone_number')
  })

  it('reports all missing fields at once', () => {
    const result = validatePersonalInfo(
      makeStore({ full_name: '', email_address: '', phone_number: '' }),
    )
    expect(result.isValid).toBe(false)
    expect(result.missingFields).toHaveLength(3)
  })
})

describe('validatePlanSelection', () => {
  it('returns isValid:true when prices are present', () => {
    const result = validatePlanSelection(makeStore())
    expect(result.isValid).toBe(true)
    expect(result.redirectTo).toBeUndefined()
  })

  it('returns isValid:false when plan_monthly_price is 0', () => {
    const result = validatePlanSelection(makeStore({ plan_monthly_price: 0 }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/select-plan')
    expect(result.missingFields).toContain('plan_monthly_price')
  })

  it('returns isValid:false when plan_yearly_price is 0', () => {
    const result = validatePlanSelection(makeStore({ plan_yearly_price: 0 }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/select-plan')
    expect(result.missingFields).toContain('plan_yearly_price')
  })
})

describe('validateAddons', () => {
  it('returns isValid:true when prior steps are complete', () => {
    const result = validateAddons(makeStore())
    expect(result.isValid).toBe(true)
  })

  it('fails if personal info is incomplete', () => {
    const result = validateAddons(makeStore({ full_name: '' }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/your-info')
  })

  it('fails if plan selection is incomplete', () => {
    const result = validateAddons(makeStore({ plan_monthly_price: 0 }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/select-plan')
  })
})

describe('validateSummary', () => {
  it('returns isValid:true when all prior steps are complete', () => {
    const result = validateSummary(makeStore())
    expect(result.isValid).toBe(true)
  })

  it('fails if personal info is incomplete', () => {
    const result = validateSummary(makeStore({ email_address: '' }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/your-info')
  })

  it('fails if plan selection is incomplete', () => {
    const result = validateSummary(makeStore({ plan_yearly_price: 0 }))
    expect(result.isValid).toBe(false)
    expect(result.redirectTo).toBe('/select-plan')
  })
})
