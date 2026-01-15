import * as z from 'zod'
import validator from 'validator'

export const gamingPlanSchema = z.object({
  full_name: z.string().min(1, 'This field is required'),
  email_address: z.email({
    pattern: z.regexes.html5Email,
    error: 'Enter a valid email address',
  }),
  phone_number: z.string().refine((v) => validator.isMobilePhone(v, 'any'), {
    message: 'Enter a valid phone number',
  }),
})

export type GamingPlanSchema = z.infer<typeof gamingPlanSchema>
