import validator from 'validator'
import * as z from 'zod'

export const addonSchema = z.object({
  name: z.string(),
  label: z.string(),
  description: z.string(),
  monthly_price: z.number(),
  yearly_price: z.number(),
})

export type AddOnSchema = z.infer<typeof addonSchema>

export const gamingPlanSchema = z.object({
  full_name: z.string().min(1, 'This field is required'),
  email_address: z.email('Enter a valid email address'),
  phone_number: z.string().refine((v) => validator.isMobilePhone(v, 'any'), {
    message: 'Enter a valid phone number',
  }),
  show_yearly: z.boolean(),
  plan: z.enum(['Arcade', 'Advanced', 'Pro']),
  plan_monthly_price: z.number(),
  plan_yearly_price: z.number(),
  addons: z.array(z.string()),
  chosen_addons: z.array(addonSchema),
})

export type GamingPlanSchema = z.infer<typeof gamingPlanSchema>

export const yourInfoStepSchema = gamingPlanSchema.pick({
  full_name: true,
  email_address: true,
  phone_number: true,
})

export type YourInfoStepSchema = z.infer<typeof yourInfoStepSchema>

export const selectPlanStepSchema = gamingPlanSchema.pick({
  plan: true,
  plan_monthly_price: true,
  plan_yearly_price: true,
  show_yearly: true,
})

export type SelectPlanStepSchema = z.infer<typeof selectPlanStepSchema>

export const addonsStepSchema = gamingPlanSchema.pick({
  addons: true,
  chosen_addons: true,
  show_yearly: true,
})

export type AddonsStepSchema = z.infer<typeof addonsStepSchema>
