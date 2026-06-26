import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import { CheckboxCard } from '@/components/CheckboxCard'
import { RadioCard } from '@/components/RadioCard'
import { SubmitButton } from '@/components/Button'
import { TextField } from '@/components/Input'
import { ToggleSwitch } from '@/components/ToggleSwitch'

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    CheckboxCard,
    RadioCard,
    TextField,
    ToggleSwitch,
  },
  formComponents: {
    SubmitButton,
  },
})
