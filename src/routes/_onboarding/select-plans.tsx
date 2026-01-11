import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/select-plans')({
  component: SelectPlansComponent,
})

function SelectPlansComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-950">Select your plan</h1>
      <p className="mt-2 text-base font-normal text-grey-500">
        You have the option of monthly or yearly billing.
      </p>
    </>
  )
}
