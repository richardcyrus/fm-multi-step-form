import { describe, expect, it } from 'vitest'
import {
  ADDON_OPTIONS,
  DEFAULT_PLAN,
  PLAN_OPTIONS,
  getAddonByName,
  getPlanByLabel,
} from '../config'

describe('PLAN_OPTIONS', () => {
  it('has exactly 3 plans', () => {
    expect(PLAN_OPTIONS).toHaveLength(3)
  })

  it('each plan has the correct shape', () => {
    for (const plan of PLAN_OPTIONS) {
      expect(plan).toHaveProperty('label')
      expect(plan).toHaveProperty('icon')
      expect(plan).toHaveProperty('monthly_price')
      expect(plan).toHaveProperty('yearly_price')
      expect(typeof plan.label).toBe('string')
      expect(typeof plan.monthly_price).toBe('number')
      expect(typeof plan.yearly_price).toBe('number')
    }
  })

  it('contains Arcade, Advanced, and Pro', () => {
    const labels = PLAN_OPTIONS.map((p) => p.label)
    expect(labels).toContain('Arcade')
    expect(labels).toContain('Advanced')
    expect(labels).toContain('Pro')
  })

  it('has increasing prices', () => {
    expect(PLAN_OPTIONS[0].monthly_price).toBeLessThan(
      PLAN_OPTIONS[1].monthly_price,
    )
    expect(PLAN_OPTIONS[1].monthly_price).toBeLessThan(
      PLAN_OPTIONS[2].monthly_price,
    )
  })
})

describe('ADDON_OPTIONS', () => {
  it('has exactly 3 add-ons', () => {
    expect(ADDON_OPTIONS).toHaveLength(3)
  })

  it('each add-on has the correct shape', () => {
    for (const addon of ADDON_OPTIONS) {
      expect(addon).toHaveProperty('name')
      expect(addon).toHaveProperty('label')
      expect(addon).toHaveProperty('description')
      expect(addon).toHaveProperty('monthly_price')
      expect(addon).toHaveProperty('yearly_price')
    }
  })
})

describe('DEFAULT_PLAN', () => {
  it('is the first plan (Arcade)', () => {
    expect(DEFAULT_PLAN).toBe(PLAN_OPTIONS[0])
    expect(DEFAULT_PLAN.label).toBe('Arcade')
  })
})

describe('getPlanByLabel', () => {
  it('returns the matching plan for "Arcade"', () => {
    const plan = getPlanByLabel('Arcade')
    expect(plan?.label).toBe('Arcade')
    expect(plan?.monthly_price).toBe(9)
    expect(plan?.yearly_price).toBe(90)
  })

  it('returns the matching plan for "Advanced"', () => {
    const plan = getPlanByLabel('Advanced')
    expect(plan?.label).toBe('Advanced')
    expect(plan?.monthly_price).toBe(12)
    expect(plan?.yearly_price).toBe(120)
  })

  it('returns the matching plan for "Pro"', () => {
    const plan = getPlanByLabel('Pro')
    expect(plan?.label).toBe('Pro')
    expect(plan?.monthly_price).toBe(15)
    expect(plan?.yearly_price).toBe(150)
  })

  it('returns undefined for an unknown label', () => {
    expect(getPlanByLabel('Unknown')).toBeUndefined()
  })

  it('is case-sensitive', () => {
    expect(getPlanByLabel('arcade')).toBeUndefined()
  })
})

describe('getAddonByName', () => {
  it('returns the matching add-on for "online_service"', () => {
    const addon = getAddonByName('online_service')
    expect(addon?.label).toBe('Online Service')
    expect(addon?.monthly_price).toBe(1)
    expect(addon?.yearly_price).toBe(10)
  })

  it('returns the matching add-on for "larger_storage"', () => {
    const addon = getAddonByName('larger_storage')
    expect(addon?.label).toBe('Larger storage')
  })

  it('returns the matching add-on for "custom_profile"', () => {
    const addon = getAddonByName('custom_profile')
    expect(addon?.label).toBe('Customizable profile')
  })

  it('returns undefined for an unknown name', () => {
    expect(getAddonByName('unknown')).toBeUndefined()
  })
})
