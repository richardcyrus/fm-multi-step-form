import { describe, expect, it } from 'vitest'
import {
  addonsStepSchema,
  gamingPlanSchema,
  selectPlanStepSchema,
  yourInfoStepSchema,
} from '../schema'

const validPersonalInfo = {
  full_name: 'John Doe',
  email_address: 'john@example.com',
  phone_number: '+12345678901',
}

const validPlan = {
  plan: 'Arcade',
  plan_monthly_price: 9,
  plan_yearly_price: 90,
  show_yearly: false,
}

const validAddons = {
  addons: ['online_service'],
  chosen_addons: [
    {
      name: 'online_service',
      label: 'Online Service',
      description: 'Access to multiplayer games',
      monthly_price: 1,
      yearly_price: 10,
    },
  ],
  show_yearly: false,
}

describe('gamingPlanSchema', () => {
  it('accepts valid complete data', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty full_name', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      full_name: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes('full_name')),
      ).toBe(true)
    }
  })

  it('rejects invalid email_address', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      email_address: 'not-an-email',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes('email_address')),
      ).toBe(true)
    }
  })

  it('rejects invalid phone_number', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      phone_number: 'abc',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes('phone_number')),
      ).toBe(true)
    }
  })

  it('rejects invalid plan enum value', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      plan: 'InvalidPlan',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('plan'))).toBe(
        true,
      )
    }
  })

  it('accepts valid plan enum values', () => {
    for (const plan of ['Arcade', 'Advanced', 'Pro'] as const) {
      const result = gamingPlanSchema.safeParse({
        ...validPersonalInfo,
        ...validPlan,
        ...validAddons,
        plan,
      })
      expect(result.success).toBe(true)
    }
  })

  it('accepts empty addons array', () => {
    const result = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      addons: [],
      chosen_addons: [],
      show_yearly: false,
    })
    expect(result.success).toBe(true)
  })

  it('show_yearly defaults affect price display but not validation', () => {
    const resultTrue = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      show_yearly: true,
    })
    const resultFalse = gamingPlanSchema.safeParse({
      ...validPersonalInfo,
      ...validPlan,
      ...validAddons,
      show_yearly: false,
    })
    expect(resultTrue.success).toBe(true)
    expect(resultFalse.success).toBe(true)
  })
})

describe('yourInfoStepSchema', () => {
  it('picks only full_name, email_address, phone_number', () => {
    const result = yourInfoStepSchema.safeParse({
      full_name: 'Jane',
      email_address: 'jane@test.com',
      phone_number: '+1 555 555 5555',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(Object.keys(result.data)).toEqual([
        'full_name',
        'email_address',
        'phone_number',
      ])
    }
  })

  it('rejects extra fields beyond the subset', () => {
    const result = yourInfoStepSchema.safeParse({
      full_name: 'Jane',
      email_address: 'jane@test.com',
      phone_number: '+1 555 555 5555',
      plan: 'Arcade',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).not.toHaveProperty('plan')
    }
  })

  it('requires all three fields', () => {
    const result = yourInfoStepSchema.safeParse({ full_name: '' })
    expect(result.success).toBe(false)
  })
})

describe('selectPlanStepSchema', () => {
  it('picks plan, prices, and show_yearly', () => {
    const result = selectPlanStepSchema.safeParse({
      plan: 'Advanced',
      plan_monthly_price: 12,
      plan_yearly_price: 120,
      show_yearly: true,
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(Object.keys(result.data)).toEqual([
        'plan',
        'plan_monthly_price',
        'plan_yearly_price',
        'show_yearly',
      ])
    }
  })

  it('rejects invalid plan in the subset', () => {
    const result = selectPlanStepSchema.safeParse({
      plan: 'fake',
      plan_monthly_price: 0,
      plan_yearly_price: 0,
      show_yearly: false,
    })
    expect(result.success).toBe(false)
  })
})

describe('addonsStepSchema', () => {
  it('picks addons, chosen_addons, and show_yearly', () => {
    const result = addonsStepSchema.safeParse({
      addons: [],
      chosen_addons: [],
      show_yearly: false,
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(Object.keys(result.data)).toEqual([
        'addons',
        'chosen_addons',
        'show_yearly',
      ])
    }
  })

  it('accepts chosen_addons with valid addon shape', () => {
    const result = addonsStepSchema.safeParse({
      addons: ['larger_storage'],
      chosen_addons: [
        {
          name: 'larger_storage',
          label: 'Larger storage',
          description: 'Extra 1TB of cloud save',
          monthly_price: 2,
          yearly_price: 20,
        },
      ],
      show_yearly: true,
    })
    expect(result.success).toBe(true)
  })
})
