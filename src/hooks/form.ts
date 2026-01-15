import { createFormHook } from '@tanstack/react-form-start'
import { fieldContext, formContext } from './form-context'
import { TextField } from '@/components/Input'
import { SubmitButton } from '@/components/Button'

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
})
