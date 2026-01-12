import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/select-plans')({
  component: SelectPlansComponent,
})

function SelectPlansComponent() {
  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Select your plan
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            You have the option of monthly or yearly billing.
          </p>
        </div>
      </div>
    </>
  )
}
