import * as React from 'react'

type InputProps = {
  label: string
  fieldType: string
}

export interface FieldProps extends InputProps, React.ComponentProps<'input'> {}

export function TextField({
  fieldType,
  label,
  name,
  placeholder,
  ...props
}: FieldProps) {
  return (
    <div className={`group ${fieldType === 'tel' ? 'is-tel' : ''}`}>
      <label htmlFor={name} className="flex flex-col hover:cursor-pointer">
        <span className="flex justify-between">
          <span className="text-xs font-normal tracking-normal text-blue-950 md:text-sm">
            {label}
          </span>
          <span className="hidden text-xs font-bold text-red-500 group-has-invalid:inline-block md:text-sm">
            This field is required
          </span>
        </span>
        <input
          type={fieldType}
          name={name}
          id={name}
          placeholder={placeholder}
          className="mt-2 min-h-10 w-full rounded-lg bg-white px-4 py-2 text-sm font-medium outline-1 -outline-offset-1 outline-purple-200 group-[.is-tel]:text-center placeholder:text-sm placeholder:font-medium placeholder:text-grey-500 invalid:outline-red-500 focus-within:text-blue-950 focus-within:outline-purple-600 hover:cursor-pointer hover:outline-purple-600 md:min-h-12 md:text-base md:group-[.is-tel]:text-left md:placeholder:text-base"
          {...props}
        />
      </label>
    </div>
  )
}
