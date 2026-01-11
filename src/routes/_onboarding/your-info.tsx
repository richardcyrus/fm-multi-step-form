import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/your-info')({
  component: YourInfoComponent,
})

function YourInfoComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
        Personal info
      </h1>
      <p className="mt-2 text-base font-normal text-grey-500">
        Please provide your name, email address, and phone number.
      </p>
    </>
  )
}
