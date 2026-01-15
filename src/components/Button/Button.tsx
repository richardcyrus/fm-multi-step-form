import React from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import type { VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
  [
    'inline-flex min-h-10 min-w-24.25 cursor-pointer items-center self-start rounded-sm border-none p-0 font-sans font-medium focus:outline-transparent focus:outline-solid md:min-h-12 md:min-w-30.75 md:rounded-lg',
  ],
  {
    variants: {
      variant: {
        primary: [
          'justify-center bg-blue-950 text-center text-sm text-white hover:bg-blue-700 md:text-base',
        ],
        secondary: [
          'justify-center bg-purple-600 text-center text-sm text-white hover:bg-purple-400 md:text-base',
        ],
        additional: [
          'justify-start text-base text-grey-500 hover:text-blue-950',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>, React.ComponentProps<'button'> {}

export function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(buttonStyles({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
