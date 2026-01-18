import type { GamingPlanSchema } from '@/lib/schema'

export interface RouteContext {
  getStoreState: () => GamingPlanSchema
}

export interface ValidationResult {
  isValid: boolean
  redirectTo?: string
  missingFields?: Array<string>
}

export const validatePersonalInfo = (
  store: GamingPlanSchema,
): ValidationResult => {
  const missingFields = []

  if (!store.full_name) missingFields.push('full_name')
  if (!store.email_address) missingFields.push('email_address')
  if (!store.phone_number) missingFields.push('phone_number')

  return {
    isValid: missingFields.length === 0,
    redirectTo: missingFields.length > 0 ? '/your-info' : undefined,
    missingFields,
  }
}

export const validatePlanSelection = (
  store: GamingPlanSchema,
): ValidationResult => {
  const missingFields = []

  // if (!store.plan) missingFields.push('plan') // Typescript says this is unnecessary!
  if (!store.plan_monthly_price) missingFields.push('plan_monthly_price')
  if (!store.plan_yearly_price) missingFields.push('plan_yearly_price')

  return {
    isValid: missingFields.length === 0,
    redirectTo: missingFields.length > 0 ? '/select-plans' : undefined,
    missingFields,
  }
}

export const validateAddons = (store: GamingPlanSchema): ValidationResult => {
  // Addons are optional, but we validate previous steps
  const personalInfoValid = validatePersonalInfo(store)
  const planValid = validatePlanSelection(store)

  if (!personalInfoValid.isValid) {
    return personalInfoValid
  }

  if (!planValid.isValid) {
    return planValid
  }

  return { isValid: true }
}

export const validateSummary = (store: GamingPlanSchema): ValidationResult => {
  // Summary requires all previous steps to be complete
  const personalInfoValid = validatePersonalInfo(store)
  const planValid = validatePlanSelection(store)

  if (!personalInfoValid.isValid) {
    return personalInfoValid
  }

  if (!planValid.isValid) {
    return planValid
  }

  return { isValid: true }
}
