import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/summary')({
  component: SummaryComponent,
})

function SummaryComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
        Finishing up
      </h1>
      <p className="mt-2 text-base font-normal text-grey-500">
        Double-check everything looks OK before confirming.
      </p>
    </>
  )
}
