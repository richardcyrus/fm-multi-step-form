import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/addons')({
  component: AddonsComponent,
})

function AddonsComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-950">Pick add-ons</h1>
      <p className="mt-2 text-base font-normal text-grey-500">
        Add-ons help enhance your gaming experience.
      </p>
    </>
  )
}
