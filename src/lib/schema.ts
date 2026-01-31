import * as z from 'zod'
import validator from 'validator'

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
