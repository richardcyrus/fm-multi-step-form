import * as React from 'react'

interface StepLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function StepLayout({
  title,
  description,
  children,
  actions,
}: StepLayoutProps) {
  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none lg:mr-25 lg:ml-21 lg:pr-0 lg:pl-0">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            {title}
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            {description}
          </p>
          <div className="mt-6md:mt-8 lg:mt-10">{children}</div>
        </div>
      </div>
      {actions && (
        <div className="inline-flex w-full justify-end bg-white p-4 md:bg-transparent md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
          {actions}
        </div>
      )}
    </>
  )
}
