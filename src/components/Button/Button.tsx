import React from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import type { VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
  [
    'inline-flex',
    'cursor-pointer',
    'items-center',
    'justify-center',
    'self-start',
    'border-none',
    'p-0',
    'font-sans',
    'font-medium',
    'min-h-12',
    'min-w-[7.6875rem]',
    'text-center',
    'focus:outline-transparent',
    'focus:outline-solid',
    'rounded-lg',
    'text-base',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-blue-950', 'text-white', 'hover:bg-blue-700'],
        secondary: ['bg-purple-600', 'text-white', 'hover:bg-purple-400'],
        additional: ['text-grey-500', 'hover:text-blue-950'],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ComponentProps<'button'>

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
