import * as React from 'react'
import { useStore } from '@tanstack/react-form-start'
import { useFieldContext } from '@/hooks/form-context'

type InputProps = {
  label: string
  fieldType: string
}

export interface FieldProps extends InputProps, React.ComponentProps<'input'> {}

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>
}) {
  return (
    <>
      {errors.map((error) => (
        <span
          key={typeof error === 'string' ? error : error.message}
          className="text-xs font-bold text-red-500 group-has-invalid:inline-block md:text-sm"
        >
          {typeof error === 'string' ? error : error.message}
        </span>
      ))}
    </>
  )
}

export function TextField({
  fieldType,
  label,
  name,
  placeholder,
  ...props
}: FieldProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={`group ${fieldType === 'tel' ? 'is-tel' : ''}`}>
      <label htmlFor={name} className="flex flex-col hover:cursor-pointer">
        <span className="flex justify-between">
          <span className="text-xs font-normal tracking-normal text-blue-950 md:text-sm">
            {label}
          </span>
          {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
        </span>
        <input
          type={fieldType}
          name={field.name}
          id={field.name}
          placeholder={placeholder}
          className={`mt-2 min-h-10 w-full rounded-lg bg-white px-4 py-2 text-sm font-medium outline-1 -outline-offset-1 ${field.state.meta.isTouched && !field.state.meta.isValid ? 'outline-red-500' : 'outline-purple-200'} group-[.is-tel]:text-left placeholder:text-sm placeholder:font-medium placeholder:text-grey-500 focus-within:text-blue-950 focus-within:outline-purple-600 hover:cursor-pointer hover:outline-purple-600 md:min-h-12 md:text-base md:group-[.is-tel]:text-left md:placeholder:text-base`}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={!field.state.meta.isValid && field.state.meta.isTouched}
          {...props}
        />
      </label>
    </div>
  )
}
