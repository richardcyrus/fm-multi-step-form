import * as React from 'react'

interface SwitchProps {
  leftLabel: string
  rightLabel: string
}

export interface ToggleSwitchProps
  extends SwitchProps, React.ComponentProps<'input'> {}

export function ToggleSwitch({
  leftLabel,
  rightLabel,
  ...props
}: ToggleSwitchProps) {
  return (
    <div className="group flex min-h-12 min-w-73.75 items-center justify-center gap-6 rounded-lg bg-blue-50 has-disabled:pointer-events-none">
      <label
        htmlFor="toggle-switch"
        className="cursor-pointer text-sm font-medium text-blue-950 group-has-checked:text-grey-500"
      >
        {leftLabel}
      </label>
      <div className="relative inline-block h-5 w-9.5">
        <input
          type="checkbox"
          id="toggle-switch"
          className="peer h-5 w-9.5 cursor-pointer appearance-none rounded-full bg-blue-950 transition-colors duration-300 checked:bg-blue-950"
          {...props}
        />
        <label
          htmlFor="toggle-switch"
          className="absolute top-1 left-1 h-3 w-3 cursor-pointer rounded-full border border-blue-950 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-4 peer-checked:border-blue-950"
        />
      </div>
      <label
        htmlFor="toggle-switch"
        className="cursor-pointer text-sm font-medium text-grey-500 group-has-checked:text-blue-950"
      >
        {rightLabel}
      </label>
    </div>
  )
}
