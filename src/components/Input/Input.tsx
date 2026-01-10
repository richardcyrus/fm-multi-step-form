import React from 'react'

type InputProps = {
  label: string
}

export interface FieldProps extends InputProps, React.ComponentProps<'input'> {}

export function TextField({ label, name, placeholder, ...props }: FieldProps) {
  return (
    <div className="group space-y-2">
      <label htmlFor={name} className="flex justify-between">
        <span className="inline-block text-sm leading-[1.2] font-normal tracking-normal text-blue-950">
          {label}
        </span>
        <span className="hidden text-sm leading-[1.2] font-bold text-red-500 group-has-invalid:inline-block">
          This field is required
        </span>
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        className="block min-h-12 w-full rounded-lg bg-white px-4 py-2 leading-[1.2] font-medium outline-1 -outline-offset-1 outline-purple-200 placeholder:text-base placeholder:font-medium placeholder:text-grey-500 invalid:outline-red-500 focus-within:text-blue-950 focus-within:outline-purple-600"
        {...props}
      />
    </div>
  )
}
