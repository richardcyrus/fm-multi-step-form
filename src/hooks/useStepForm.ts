import { useCallback } from 'react'
import { useAppForm } from './form'
import { useGamingPlanStore } from '@/store/store'

interface UseStepFormOptions<T> {
  defaultValues: T
  schema: any
  onSubmit: (data: T) => void
}

export function useStepForm<T>({
  defaultValues,
  schema,
  onSubmit,
}: UseStepFormOptions<T>) {
  const setData = useGamingPlanStore((state) => state.setData)

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }: { value: T }) => {
      setData(value as any)
      onSubmit(value)
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      form.handleSubmit()
    },
    [form],
  )

  return { form, handleSubmit }
}
