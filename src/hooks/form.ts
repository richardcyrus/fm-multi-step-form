import { createFormHook } from '@tanstack/react-form-start'
import { fieldContext, formContext } from './form-context'
import { TextField } from '@/components/Input'
import { SubmitButton } from '@/components/Button'
import { RadioCard } from '@/components/RadioCard'
import { ToggleSwitch } from '@/components/ToggleSwitch'

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    ToggleSwitch,
    RadioCard,
  },
  formComponents: {
    SubmitButton,
  },
})
