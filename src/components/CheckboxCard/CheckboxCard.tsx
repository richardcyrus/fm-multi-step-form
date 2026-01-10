import * as React from 'react'

interface CheckboxProps {
  label: string
  subLabel: string
  price: number
  showYearly: boolean
  yearlyPrice: number
}

export interface CheckboxCardProps
  extends CheckboxProps, React.ComponentProps<'input'> {}

export function CheckboxCard({
  label,
  subLabel,
  price,
  showYearly,
  yearlyPrice,
  ...props
}: CheckboxCardProps) {
  return (
    <label className="grid min-h-15.5 cursor-pointer grid-cols-[1.25rem_2fr_1fr] items-center rounded-lg border border-purple-200 bg-white px-4 py-[.71875rem] hover:border-purple-600 has-checked:border-purple-600 has-checked:bg-blue-50 md:min-h-20.25 md:px-6 md:py-4">
      <span className="relative inline-grid">
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-purple-200 transition-all checked:bg-purple-600"
          {...props}
        />
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 9"
            className="h-2.25 w-3"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="m1 4 3.433 3.433L10.866 1"
            />
          </svg>
        </span>
      </span>
      <span className="flex flex-col pl-4">
        <span className="text-sm font-medium text-blue-950 md:text-base">
          {label}
        </span>
        <span className="text-xs font-normal text-grey-500 md:text-sm">
          {subLabel}
        </span>
      </span>
      <span className="text-right text-xs font-normal text-purple-600 md:text-sm">
        {showYearly ? `+$${yearlyPrice}/yr` : `+$${price}/mo`}
      </span>
    </label>
  )
}
