import * as React from 'react'

interface RadioProps {
  discountMessage?: string
  icon: string
  label: string
  price: number
  showYearly: boolean
  yearlyPrice: number
}

export interface RadioCardProps
  extends RadioProps, React.ComponentProps<'input'> {}

export function RadioCard({
  discountMessage,
  icon,
  label,
  price,
  showYearly,
  yearlyPrice,
  ...props
}: RadioCardProps) {
  return (
    <label className="flex min-h-20 cursor-pointer items-center rounded-lg border border-purple-200 bg-white p-4 hover:border-purple-600 has-checked:border-purple-600 has-checked:bg-blue-50 md:grid md:grid-cols-[40px_1fr] lg:flex lg:min-h-40 lg:min-w-34.5 lg:flex-col lg:items-start lg:p-4">
      <input
        type="radio"
        className="absolute h-0 w-0 cursor-pointer opacity-0"
        value={label.toLowerCase()}
        {...props}
      />
      <span>
        <img src={icon} alt={`${label} icon`} className="h-10 w-10" />
      </span>
      <span className="flex flex-col pl-4 md:grid md:grid-cols-2 lg:mt-6.5 lg:flex lg:pl-0">
        <span className="inline-flex flex-col">
          <span className="text-base font-medium text-blue-950">{label}</span>
          <span className="text-sm text-grey-500">
            {showYearly ? `$${yearlyPrice}/yr` : `$${price}/mo`}
          </span>
        </span>
        {showYearly ? (
          <span className="text-xs text-blue-950 md:place-content-center md:text-right lg:mt-2 lg:text-left">
            {discountMessage ?? `2 months free`}
          </span>
        ) : null}
      </span>
    </label>
  )
}
