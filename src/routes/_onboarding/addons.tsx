import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/addons')({
  component: AddonsComponent,
})

function AddonsComponent() {
  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Pick add-ons
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            Add-ons help enhance your gaming experience.
          </p>
        </div>
      </div>
    </>
  )
}
